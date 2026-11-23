---
slug: hpc-spark-slurm-reproducible-cluster
title: "Running Spark clusters on SLURM: a reproducible setup with Pixi and sparkhpc"
description: "How to set up reproducible Apache Spark clusters on a SLURM HPC cluster using Pixi for environment management and sparkhpc for orchestration, based on the gkit Spark-on-SLURM implementation."
authors: [vieomics]
tags: [hpc]
image: ./imgs/hpc-spark-slurm-reproducible-cluster.png
---

Running distributed Spark workloads on HPC clusters is a common task in bioinformatics and data science. Integrating Spark with SLURM, the dominant HPC job scheduler, takes some care: compute resources must be allocated through SLURM, a Spark master has to be started, worker processes coordinated, and dependencies such as Java, PySpark and Python made available on every node. This post describes a reproducible way to run Spark clusters on SLURM using **Pixi** for environment management and **sparkhpc** for orchestration, based on the gkit Spark-on-SLURM implementation.

<!--truncate-->

## 1. The challenge: Spark + SLURM integration

### 1.1. Why Spark on SLURM?

On most HPC clusters, SLURM controls resource allocation and job execution. To run Spark:

- Spark master and worker processes cannot simply be launched directly—SLURM must allocate the resources first
- Dependencies (Java, PySpark, Python) must be available and consistent across all compute nodes
- The Spark driver needs to discover and connect to the master and worker nodes
- If jobs fail or time out, cleanup and logging should be deterministic

### 1.2. The traditional approach

Without an orchestration layer, the setup is often done by hand:

```bash
# Manually request resources
salloc -N 2 -c 4 --time=00:30:00

# SSH to first node, start Spark master manually
ssh node1
SPARK_HOME=/opt/spark ./bin/spark-class org.apache.spark.deploy.master.Master

# SSH to second node, start worker manually
ssh node2
SPARK_HOME=/opt/spark ./bin/spark-class org.apache.spark.deploy.worker.Worker \
    spark://node1:7077 --cores 4

# Run your driver script
python my_analysis.py

# Manual cleanup
# Kill processes if they're still running...
```

**Problems:**
- Error-prone (easy to forget ports, hostnames, cleanup)
- Not reproducible (different developers may set it up differently)
- Dependencies scattered across system paths or manual installations
- Difficult to integrate into automated pipelines

### 1.3. The approach used here: Pixi + sparkhpc

```bash
# Single command sets everything up with reproducible dependencies
make setup

# Single command runs the entire workflow
make example
```

Behind the scenes:
- Pixi creates an isolated environment with Python, Java, and PySpark pinned to specific versions
- sparkhpc submits a SLURM batch job that orchestrates Spark startup
- A Python driver connects, runs computations, and cleans up automatically

---

## 2. Understanding the architecture

### 2.1. The component stack

```
┌─────────────────────────────────────────────┐
│ User Machine (submit dir)                   │
│ ┌───────────────────────────────────────┐   │
│ │ Python Driver (run_example.py)        │   │
│ └───────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
                      ↓ (sparkhpc.submit())
┌─────────────────────────────────────────────┐
│ SLURM Controller                            │
│ (sbatch sparkjob.slurm.template)            │
└─────────────────────────────────────────────┘
                      ↓ (srun)
┌─────────────────────────────────────────────┐
│ Spark Master (Node 1)                       │
│ Spark Workers (Nodes 1-N via srun)          │
│                                             │
│ Environment: Python, Java, PySpark          │
│ (from Pixi)                                 │
└─────────────────────────────────────────────┘
```

### 2.2. Key files in the gkit Spark-on-SLURM setup

```
spark-on-slurm/
├── pixi.toml                      # Environment definition
├── Makefile                       # User entry points
├── sparkhpc/
│   ├── run_example.py             # End-to-end workflow
│   ├── sparkhpc/
│   │   ├── sparkjob.py            # Base Spark job class
│   │   ├── slurmsparkjob.py       # SLURM-specific implementation
│   │   └── templates/
│   │       └── sparkjob.slurm.template  # SLURM batch script template
│   └── scripts/
└── sparkhpc.log                   # Cluster logs
```

---

## 3. Reproducibility with Pixi

### 3.1. What is Pixi?

Pixi is a cross-platform package manager that creates reproducible environments. Unlike venv or conda, Pixi locks all transitive dependencies, which helps keep setups identical across machines.

### 3.2. The pixi.toml configuration

```toml
[workspace]
authors = ["Vieomics"]
channels = ["conda-forge", "bioconda"]
name = "spark-on-slurm"
platforms = ["linux-64"]
version = "0.1.0"

[tasks]
sparkhpc-example = "python sparkhpc/run_example.py"

[dependencies]
python = "3.11.*"
openjdk = "==17.0.18"
pyspark = ">=4.1.1,<5"
```

**Key aspects:**
- **Channels**: `conda-forge` and `bioconda` provide pre-built packages (including Java and Spark)
- **Pinned versions**: `openjdk = "==17.0.18"` fixes the exact Java version across runs
- **Task definition**: the `sparkhpc-example` command runs the Python driver inside the Pixi environment
- **Platform**: `linux-64` matches typical HPC clusters

### 3.3. Environment setup

```bash
# Install Pixi (first time)
curl -sSL https://pixi.sh/install.sh | sh

# Install dependencies into pixi.lock
pixi install

# Run a command in the Pixi environment
pixi run sparkhpc-example
# or via Makefile
make example
```

When `pixi run sparkhpc-example` executes:
1. Pixi activates the locked environment (Python 3.11, OpenJDK 17, PySpark 4.1)
2. `JAVA_HOME` is set automatically
3. `SPARK_HOME` is resolved from the PySpark installation
4. The Python driver runs in this isolated context

---

## 4. Spark cluster orchestration with sparkhpc

### 4.1. The sparkjob class

The `sparkjob` class wraps Spark on SLURM by:

1. **Generating a SLURM batch script** from a template
2. **Submitting the batch job** via `sbatch`
3. **Polling for the Spark master URL** (read from a metadata file)
4. **Starting a PySpark context** that connects to the master
5. **Stopping the cluster** and cleaning up when done

Example usage (from `run_example.py`):

```python
from sparkhpc import sparkjob

# Create a Spark job: 2 cores total, 2 cores per executor, 10 min walltime
sj = sparkjob.sparkjob(ncores=2, cores_per_executor=2, walltime="00:10")

# Submit to SLURM
cluster_id = sj.submit()
print(f"submitted cluster_id={cluster_id} jobid={sj.jobid}")

# Poll until master starts (max 3 minutes)
started = False
deadline = time.time() + 180
while time.time() < deadline:
    master = sj.master_url()
    if master:
        print(f"master={master}")
        started = True
        break
    time.sleep(1)

if not started:
    sj.stop()
    raise RuntimeError("Spark master did not start in time")

# Start PySpark context
sc = sj.start_spark(graphframes_package=None)

# Run Spark actions
count_result = sc.parallelize(range(100)).count()
sum_result = sc.parallelize(range(1, 11)).sum()
print(f"count={count_result}")
print(f"sum={sum_result}")

# Always clean up
try:
    # ... run spark tasks ...
finally:
    sc.stop()
    sj.stop()
    print("cluster stopped")
```

### 4.2. The SLURM batch script template

Behind the scenes, sparkhpc generates a SLURM script of roughly this form:

```bash
#!/bin/bash
#SBATCH --job-name=sparkjob
#SBATCH --nodes=1
#SBATCH --cpus-per-task=2
#SBATCH --time=00:10:00
#SBATCH --output=sparkcluster-%j.log

# Start Spark master on this node
export SPARK_HOME=/path/to/pyspark
$SPARK_HOME/bin/spark-class org.apache.spark.deploy.master.Master \
    --host $(hostname) \
    --port 7077 \
    --webui-port 8080 \
    > master.log 2>&1 &
MASTER_PID=$!

# Extract master URL and write to metadata file
sleep 2
MASTER_URL="spark://$(hostname):7077"
echo $MASTER_URL > $HOME/.sparkhpc_${SLURM_JOBID}_master

# Start Spark workers via srun (parallel on allocated nodes)
srun $SPARK_HOME/bin/spark-class org.apache.spark.deploy.worker.Worker \
    --cores 2 \
    $MASTER_URL

# Cleanup
wait $MASTER_PID
```

**Key points:**
- Master binds to the node's hostname and port 7077
- The master URL is written to a metadata file for the driver to discover
- `srun` parallelizes worker startup across allocated nodes
- All processes run within the SLURM allocation and clean up when the job ends

### 4.3. How the driver discovers the master

The `master_url()` method polls for the metadata file:

```python
def master_url(self):
    """Check if master URL is available in metadata file."""
    metadata_path = f"{os.path.expanduser('~')}/.sparkhpc_{self.jobid}_master"
    if os.path.exists(metadata_path):
        with open(metadata_path, 'r') as f:
            return f.read().strip()
    return None
```

This avoids hardcoding hostnames (which vary across clusters) and lets the driver and master run asynchronously.

---

## 5. Running the example locally or on a SLURM cluster

### 5.1. Local setup

If you have a local SLURM cluster (for example, via Docker):

```bash
cd spark-on-slurm

# Install dependencies
make setup

# Run the example
make example
```

Expected output:

```
submitted cluster_id=abc123 jobid=12345
master=spark://node1:7077
count=100
sum=55
cluster stopped
```

### 5.2. On a real HPC cluster

The same commands work on a SLURM-managed HPC cluster:

```bash
# Log in to the cluster
ssh user@hpc.example.com
cd spark-on-slurm

# First time: install Pixi and dependencies
make setup

# Run Spark via SLURM
make example

# View Spark master logs if needed
tail -f sparkhpc/sparkcluster-*.log
```

### 5.3. Cleaning up

```bash
# Remove generated artifacts
make clean

# Manually check for lingering jobs
squeue -u $USER
```

---
## 6 Key takeaways

1. **Pixi provides reproducible environments** — all dependencies (Python, Java, PySpark) are locked in `pixi.lock`
2. **sparkhpc orchestrates Spark on SLURM** — it handles SLURM batch submission, master startup, and worker coordination
3. **Metadata files enable driver-master discovery** — no hardcoding of hostnames or ports
4. **Single command to run** — `make setup` then `make example`, or `pixi run sparkhpc-example`
5. **Suitable for HPC pipelines** — the same setup extends from local testing to real clusters

Combining Pixi's reproducibility with sparkhpc's SLURM orchestration makes it easier to build Spark workflows that are auditable and portable across clusters.

---

## References

- [Pixi Documentation](https://pixi.sh) — reproducible environment management
- [sparkhpc GitHub Repository](https://github.com/rokroskar/sparkhpc) — original Spark-on-HPC framework
- [gkit Spark-on-SLURM](https://github.com/gianglabs/gkit/tree/main/spark-on-slurm) — updated implementation with modern Spark/SLURM support
- [Apache Spark on HPC Clusters](https://spark.apache.org/docs/latest/) — official Spark documentation
- [SLURM Workload Manager](https://slurm.schedmd.com/) — HPC job scheduling and resource management
- [Building a Slurm HPC Cluster (Part 1)](/en/blogs/how-to-build-slurm-hpc-part-1) — foundation for SLURM deployment
- [Testing Ansible Playbooks for HPC with Molecule](/en/blogs/hpc-ansible-molecule-playbook-testing) — automated testing for HPC infrastructure
- Cover image: [Kraken Supercomputer (3592578852)](https://commons.wikimedia.org/wiki/File:Kraken_Supercomputer_%283592578852%29.jpg) — Oak Ridge National Laboratory, Wikimedia Commons, CC BY 2.0
