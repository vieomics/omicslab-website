---
slug: nf-modules-template-copier-ci-cd
title: "Xây dựng template module Nextflow với Copier, CI/CD và nf-test"
description: "Cách nf-modules-template tạo khung nhất quán cho repository module Nextflow bằng Copier, đảm bảo chất lượng mã qua pre-commit hook và chạy kiểm thử song song nhờ sharding của nf-test."
authors: [vieomics]
tags: [nextflow, copier, ci-cd, nf-test, testing, reproducibility, linting]
image: ./imgs/nf-modules-template-copier-ci-cd.png
---

Duy trì một thư viện module Nextflow dùng lại được là bài toán thường gặp với các nhóm bioinformatics. Nếu thiếu một cấu trúc nhất quán, quy ước chất lượng mã và kiểm thử tự động, module sẽ khó chia sẻ, khó xác thực và khó tích hợp vào pipeline. **nf-modules-template** giải quyết điều này bằng một template dùng **Copier** để tạo khung repository module, **GitHub Actions** cho CI/CD, **pre-commit hook** cho chất lượng mã và **nf-test** kèm sharding để kiểm thử module. Bài viết này mô tả cách các phần đó khớp với nhau.

<!--truncate-->

## 1. Vấn đề: quản lý module phân mảnh

### 1.1. Vì sao repository module lại quan trọng

Trong các workflow bioinformatics lớn hơn, nhóm thường phát triển hàng chục đến hàng trăm process Nextflow dùng lại được. Nếu thiếu một repository module tập trung và có cấu trúc:

- Lập trình viên sao chép mã giữa các dự án
- Module thiếu tài liệu và metadata chuẩn hóa
- Kiểm thử diễn ra tùy hứng hoặc không có
- Chất lượng mã khác biệt giữa các module
- Tích hợp với pipeline khác dễ sai sót
- Quản lý phiên bản và theo dõi phụ thuộc trở nên khó khăn

### 1.2. Cách làm thủ công

Nếu không có template, việc thiết lập một repository module mới gồm nhiều bước thủ công:

```bash
# Manual directory creation
mkdir -p my-modules/{modules,subworkflows,tests,docs,.github/workflows}

# Manual configuration file creation
touch {.pre-commit-config.yaml,ruff.toml,nf-test.config,Makefile}

# Manual GitHub workflow setup (copy-paste from other projects)
touch .github/workflows/lint.yml
touch .github/workflows/nf-test.yml

# Manual CI/CD pipeline configuration
# ... dozens of manual steps with many opportunities for error
```

**Vấn đề:**
- Không nhất quán giữa các repository module
- Workflow lỗi thời ở những dự án cũ
- Khó áp đặt tiêu chuẩn giữa các nhóm
- Onboard lập trình viên mới tốn thời gian
- Thay đổi về best practice đòi hỏi cập nhật thủ công ở mọi nơi

### 1.3. Cách làm ở đây: Copier + template

```bash
# One command to create a fully configured module repository
copier copy gh:nf-core/modules-template ./my-new-modules-library

# Follow interactive prompts
# → Repo host? GitHub
# → Organization name? my-org
# → License? MIT License
# → ... (5-10 quick prompts)

# One command to initialize
cd my-new-modules-library
bash ./project_init.sh

# Fully configured repository with:
# ✓ Pre-commit hooks (ruff, prettier, hadolint, jsonschema)
# ✓ GitHub Actions workflows (lint + nf-test)
# ✓ nf-test framework with sharding support
# ✓ Module structure and examples
# ✓ Documentation setup (MkDocs)
# ✓ Contributing guidelines
```

---

## 2. Hiểu về kiến trúc

### 2.1. Ngăn xếp công nghệ

```
┌────────────────────────────────────────────────────┐
│ nf-modules-template Repository                     │
├────────────────────────────────────────────────────┤
│                                                    │
│ ┌─────────────────────────────────────────────┐   │
│ │ Copier Configuration (copier.yml)           │   │
│ │ - Template parameters                       │   │
│ │ - Jinja2 templating                         │   │
│ │ - Interactive prompts                       │   │
│ └─────────────────────────────────────────────┘   │
│                       ↓                            │
│ ┌─────────────────────────────────────────────┐   │
│ │ Generated Repository                        │   │
│ │ - Project structure                         │   │
│ │ - Module templates                          │   │
│ │ - Workflows                                 │   │
│ │ - Configurations                            │   │
│ └─────────────────────────────────────────────┘   │
│                       ↓                            │
│ ┌─────────────────────────────────────────────┐   │
│ │ Code Quality (Pre-commit Hooks)             │   │
│ │ - Ruff (Python linting)                     │   │
│ │ - Prettier (YAML/JSON formatting)           │   │
│ │ - Hadolint (Dockerfile validation)          │   │
│ │ - JSON Schema validation                    │   │
│ └─────────────────────────────────────────────┘   │
│                       ↓                            │
│ ┌─────────────────────────────────────────────┐   │
│ │ CI/CD Workflows (GitHub Actions)            │   │
│ │ ┌─────────────────────────────────────────┐ │   │
│ │ │ Lint Workflow (PR/push)                 │ │   │
│ │ │ - Pre-commit linting                    │ │   │
│ │ │ - nf-core linting                       │ │   │
│ │ │ - YAML/JSON schema validation           │ │   │
│ │ └─────────────────────────────────────────┘ │   │
│ │ ┌─────────────────────────────────────────┐ │   │
│ │ │ nf-test Workflow (parallelized)         │ │   │
│ │ │ - Shard detection (get-shards action)   │ │   │
│ │ │ - Parallel test execution               │ │   │
│ │ │ - BAM/VCF/Utils plugins                 │ │   │
│ │ └─────────────────────────────────────────┘ │   │
│ └─────────────────────────────────────────────┘   │
│                       ↓                            │
│ ┌─────────────────────────────────────────────┐   │
│ │ Module/Subworkflow (nf-test Framework)      │   │
│ │ - Snapshot testing                          │   │
│ │ - Input/output validation                   │   │
│ │ - Plugin support (BAM, VCF)                 │   │
│ └─────────────────────────────────────────────┘   │
│                                                    │
└────────────────────────────────────────────────────┘
```

### 2.2. Cấu trúc repository

Một repository module được sinh ra có dạng:

```
my-modules/
├── .github/
│   ├── workflows/
│   │   ├── lint.yml                    # Linting checks
│   │   └── nf-test.yml                 # Testing workflow
│   ├── CONTRIBUTING.md                 # Contributing guidelines
│   └── ISSUE_TEMPLATE/                 # Issue templates
├── modules/
│   ├── nf-core/                        # nf-core modules (shared)
│   │   └── examplemodule/
│   │       ├── main.nf                 # Process definition
│   │       ├── meta.yml                # Module metadata
│   │       ├── environment.yml         # Conda environment
│   │       ├── tests/
│   │       │   ├── main.nf.test.jinja # Test file
│   │       │   └── tags.yml            # Test tags
│   │       └── nextflow.config         # Module config
│   └── my-org/                         # Organization-specific modules
│       └── custommodule/               # Your custom modules follow same structure
├── subworkflows/                       # Composite workflows
│   ├── nf-core/
│   └── my-org/
├── tests/
│   ├── config/
│   │   ├── nf-test.config              # Test configuration
│   │   └── pytest_modules.yml          # Pytest config
│   ├── pytest.ini
│   └── demo_nextflow.config
├── .pre-commit-config.yaml             # Pre-commit hooks configuration
├── .nf-core.yml                        # nf-core configuration
├── nf-test.config                      # nf-test framework config
├── ruff.toml                           # Python linter config
├── .prettierignore & .prettierrc.yml   # Code formatter config
├── mkdocs.yml                          # Documentation config
├── main.nf                             # Example main workflow
├── nextflow.config                     # Main Nextflow config
├── Makefile                            # Development commands
├── README.md                           # Project documentation
└── LICENSE                             # License file
```

---

## 3. Copier: hệ thống template

### 3.1. Copier là gì?

Copier là một template engine và công cụ tạo khung, có thể:
- Dùng **Jinja2 templating** để sinh tệp động
- Hỗ trợ **prompt tương tác** để thu thập metadata dự án
- **Cập nhật tăng dần** (tái sinh từ template đã cập nhật)
- Hoạt động với các hệ thống **quản lý phiên bản**

### 3.2. Cấu hình copier.yml

Tệp `copier.yml` của template định nghĩa các prompt và biến template:

```yaml
repo_host:
  type: str
  help: "What is the host of your code repository?"
  default: "https://github.com"
  choices:
    GitHub: "https://github.com"
    Gitlab: "https://gitlab.com"

repo_org_name:
  type: str
  help: "What is your organization/user name?"
  placeholder: "demo-org"
  required: true
  validator: >-
    {% if not (repo_org_name | regex_search('^[a-zA-Z][a-zA-Z0-9\-_]+$')) %}
    repo_org_name must start with a letter...
    {% endif %}

short_org_name:
  type: str
  help: "What is your abbreviated org name?"
  default: "{{ repo_org_name }}"
  validator: >-
    {% if not (short_org_name | regex_search('^[a-z\-_]+$')) %}
    short_org_name must be lowercase...
    {% endif %}

ci:
  type: str
  help: "What CI provider will you use?"
  default: "github"
  choices:
    Github Actions: "github"
    None: "none"
  when: "{{ repo_host == 'https://github.com' }}"

copyright_license:
  type: str
  help: "Your project's license"
  default: "MIT License"
  choices:
    - "MIT License"
    - "Apache License 2.0"
    - "GPL v3.0"
    # ... many more options
```

### 3.3. Dùng Copier để sinh repository

```bash
# Install Copier
pipx install copier

# Generate from the template
copier copy --vcs-ref main gh:nf-core/modules-template ./my-modules

# Interactive prompts:
# repo_host? [https://github.com]: 
# repo_org_name? [demo-org]: my-org
# short_org_name? [my-org]: myorg
# ci? [github]: github
# repo_name? [modules]: bioinformatics-modules
# description? [An nf-core modules repository...]: My custom Nextflow modules
# copyright_holder? [Author or Organization Name]: My Organization
# default_branch? [main]: main
```

### 3.4. Jinja2 templating trong thực tế

Các tệp có phần mở rộng `.jinja` là template sẽ được render:

```yaml
# .pre-commit-config.yaml.jinja
repos:
  - repo: https://github.com/pre-commit/mirrors-prettier
    rev: "v3.1.0"
    hooks:
      - id: prettier
        
  - repo: https://github.com/python-jsonschema/check-jsonschema
    rev: 0.35.0
    hooks:
      - id: check-jsonschema
        # Validate modules for {{ short_org_name }}
        files: ^modules/{{ short_org_name }}/.*/meta\.yml$
        args: ["--schemafile", "modules/yaml-schema.json"]
```

Khi render với `short_org_name = "myorg"`, kết quả là:

```yaml
# .pre-commit-config.yaml (rendered)
repos:
  - repo: https://github.com/pre-commit/mirrors-prettier
    rev: "v3.1.0"
    hooks:
      - id: prettier
        
  - repo: https://github.com/python-jsonschema/check-jsonschema
    rev: 0.35.0
    hooks:
      - id: check-jsonschema
        # Validate modules for myorg
        files: ^modules/myorg/.*/meta\.yml$
        args: ["--schemafile", "modules/yaml-schema.json"]
```

Templating có điều kiện cũng hoạt động:

```jinja
# .github/workflows folder structure
{% if 'github' in repo_host %}.github{% endif %}/
{% if ci =='github' %}actions{% endif %}/
```

Cách này chỉ tạo `.github/actions/` cho repository dựa trên GitHub.

---

## 4. Tổ chức repository: module và subworkflow

### 4.1. Cấu trúc thư mục module

Module là những process tự chứa, có kiểm thử và tài liệu riêng:

```
modules/
├── nf-core/                          # Official nf-core modules
│   ├── bwa/
│   │   ├── index/
│   │   │   ├── main.nf               # Module process
│   │   │   ├── meta.yml              # Metadata
│   │   │   ├── environment.yml       # Dependencies
│   │   │   └── tests/
│   │   │       ├── main.nf.test.jinja
│   │   │       ├── tags.yml
│   │   │       └── nextflow.config
│   │   └── mem/
│   └── fastqc/
├── my-org/                           # Organization-specific modules
│   └── custom_qc/
│       ├── main.nf
│       ├── meta.yml
│       ├── environment.yml
│       └── tests/
└── yaml-schema.json                  # Schema for validating meta.yml
```

### 4.2. Giải phẫu module: một ví dụ hoàn chỉnh

```groovy
// modules/my-org/examplemodule/main.nf
process EXAMPLEMODULE {
    tag "$meta.id"
    label 'process_medium'
    
    // Conda environment for reproducibility
    conda "${moduleDir}/environment.yml"
    
    // Container support (Docker or Singularity)
    container "${ workflow.containerEngine == 'singularity' && !task.ext.singularity_pull_docker_container ?
        'https://depot.galaxyproject.org/singularity/fastqc:0.12.1--hdfd78af_0' :
        'biocontainers/fastqc:0.12.1--hdfd78af_0' }"
    
    // Inputs with metadata
    input:
    tuple val(meta), path(reads)
    
    // Outputs with emit labels
    output:
    tuple val(meta), path("*.html"), emit: html
    tuple val(meta), path("*.zip") , emit: zip
    path  "versions.yml"           , emit: versions
    
    // Conditional execution
    when:
    task.ext.when == null || task.ext.when
    
    script:
    def args = task.ext.args ?: ''
    def prefix = task.ext.prefix ?: "${meta.id}"
    def memory_in_mb = MemoryUnit.of("${task.memory}").toUnit('MB') / task.cpus
    def fastqc_memory = memory_in_mb > 10000 ? 10000 : (memory_in_mb < 100 ? 100 : memory_in_mb)
    
    """
    fastqc \\
        $args \\
        --threads $task.cpus \\
        --memory $fastqc_memory \\
        $reads
    
    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        fastqc: \$( fastqc --version | sed '/FastQC v/!d; s/.*v//' )
    END_VERSIONS
    """
    
    stub:
    def prefix = task.ext.prefix ?: "${meta.id}"
    """
    touch ${prefix}.html
    touch ${prefix}.zip
    cat <<-END_VERSIONS > versions.yml
    "${task.process}":
        fastqc: 0.12.1
    END_VERSIONS
    """
}
```

### 4.3. Metadata module: meta.yml

```yaml
# modules/my-org/examplemodule/meta.yml
name: examplemodule
description: "Brief description of what the module does"
keywords:
  - fastqc
  - quality-control
  - sequencing

tools:
  - fastqc:
      description: "A quality control tool for high throughput sequence data"
      homepage: "https://www.bioinformatics.babraham.ac.uk/projects/fastqc"
      documentation: "https://www.bioinformatics.babraham.ac.uk/projects/fastqc/Help/"
      tool_dev_url: "https://github.com/s-andrews/FastQC"
      doi: "10.1093/bioinformatics/btp324"
      licence: ["GPL v3"]
      version: "0.12.1"

input:
  - meta:
      type: map
      description: Metadata map with sample ID
      pattern: "id"
  - reads:
      type: file
      description: "Input FASTQ file"
      pattern: "*.{fq,fastq}{,.gz}"

output:
  - meta:
      type: map
      description: Metadata map
      pattern: "id"
  - html:
      type: file
      description: "FastQC HTML report"
      pattern: "*.html"
      
authors:
  - "@your-github-handle"
maintainers:
  - "@your-github-handle"
```

### 4.4. Môi trường và phụ thuộc

```yaml
# modules/my-org/examplemodule/environment.yml
name: examplemodule
channels:
  - conda-forge
  - bioconda
dependencies:
  - bioconda::fastqc=0.12.1
  - conda-forge::openjdk=17
```

### 4.5. Subworkflow: module tổ hợp

Subworkflow kết hợp nhiều module thành workflow dùng lại được:

```
subworkflows/
├── nf-core/
│   └── bam_qc/
│       ├── main.nf                  # Composite workflow
│       ├── meta.yml                 # Metadata
│       └── tests/
│           ├── main.nf.test
│           └── tags.yml
└── my-org/
    └── variant_calling_pipeline/
```

```groovy
// subworkflows/my-org/variant_calling_pipeline/main.nf
workflow VARIANT_CALLING_PIPELINE {
    take:
    bam
    reference_fasta
    
    main:
    // Call multiple modules in sequence
    SAMTOOLS_INDEX(bam)
    BCFTOOLS_MPILEUP(bam, reference_fasta)
    BCFTOOLS_CALL(BCFTOOLS_MPILEUP.out.vcf)
    TABIX_BGZIP(BCFTOOLS_CALL.out.vcf)
    
    emit:
    vcf = TABIX_BGZIP.out.vcf
    tbi = TABIX_BGZIP.out.tbi
}
```

---

## 5. Pre-commit hook: chất lượng mã tự động

### 5.1. Pre-commit hook là gì?

Pre-commit hook là những script tự động chạy trước mỗi lần commit git. Chúng:
- Phát hiện vấn đề style trước khi commit
- Áp đặt định dạng nhất quán trên toàn codebase
- Xác thực cú pháp YAML, JSON và Dockerfile
- Giảm khả năng push mã lỗi

### 5.2. Thiết lập .pre-commit-config.yaml

```yaml
# .pre-commit-config.yaml
repos:
  # Code formatter for YAML, JSON, Markdown, etc.
  - repo: https://github.com/pre-commit/mirrors-prettier
    rev: "v3.7.3"
    hooks:
      - id: prettier
        entry: prettier --experimental-cli --write --ignore-unknown
        exclude: |
          (?x)^(
              .*\.snap$
          )$
        additional_dependencies:
          - prettier@3.7.3
  
  # General file fixes
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v6.0.0
    hooks:
      - id: trailing-whitespace
        args: [--markdown-linebreak-ext=md]
      - id: end-of-file-fixer
  
  # YAML/JSON Schema validation
  - repo: https://github.com/python-jsonschema/check-jsonschema
    rev: 0.35.0
    hooks:
      # Validate module meta.yml files
      - id: check-jsonschema
        name: "Validate meta.ymls (modules/my-org)"
        files: ^modules/my-org/.*/meta\.yml$
        types: [yaml]
        args: ["--schemafile", "modules/yaml-schema.json"]
      
      # Validate environment.yml files
      - id: check-jsonschema
        name: "Validate environment.ymls"
        files: ^modules/my-org/.*/environment\.yml$
        types: [yaml]
        args: ["--schemafile", "modules/environment-schema.json"]
      
      # Validate GitHub workflows
      - id: check-github-workflows
  
  # Python linting and formatting
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.14.7
    hooks:
      - id: ruff
        files: \.py$
        args: [--fix, --exit-non-zero-on-fix]
      - id: ruff-format
  
  # Dockerfile linting
  - repo: https://github.com/hadolint/hadolint
    rev: v2.14.0
    hooks:
      - id: hadolint-docker
        args: ["--failure-threshold", "error"]
```

### 5.3. Cài đặt và sử dụng

```bash
# Install pre-commit
pip install pre-commit

# Set up hooks in your repository
pre-commit install

# Manually run hooks on all files (useful for CI)
pre-commit run --all-files

# Skip hooks for a specific commit (if absolutely necessary)
git commit --no-verify
```

### 5.4. Mỗi hook làm gì

| Hook | Mục đích | Ví dụ |
|------|---------|---------|
| **prettier** | Định dạng YAML, JSON, Markdown theo style nhất quán | Thụt lề, độ dài dòng |
| **trailing-whitespace** | Xóa khoảng trắng cuối dòng | Dọn artifact của editor |
| **end-of-file-fixer** | Đảm bảo tệp kết thúc bằng newline | Sửa newline cuối tệp bị thiếu |
| **check-jsonschema** | Xác thực YAML/JSON theo schema | Đảm bảo cấu trúc meta.yml |
| **ruff** | Lint Python (sắp xếp import, lỗi) | Sửa thứ tự `import`, bắt biến chưa định nghĩa |
| **ruff-format** | Định dạng mã Python | Khoảng trắng, độ dài dòng nhất quán |
| **hadolint-docker** | Lint Dockerfile | Bắt vi phạm best practice của Docker |

---

## 6. Workflow GitHub Actions CI/CD

### 6.1. Workflow lint (lint.yml)

Workflow lint chạy trên mỗi pull request để bắt vấn đề chất lượng mã:

```yaml
# .github/workflows/lint.yml (simplified)
name: Run Linting
on:
  pull_request:
    branches: [main]
  merge_group:
    types: [checks_requested]
  workflow_dispatch:

concurrency:
  group: ${{ github.workflow }}-${{ github.event.pull_request.number || github.ref }}
  cancel-in-progress: true

jobs:
  pre-commit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - name: Run pre-commit checks
        uses: j178/prek-action@v1  # Runs pre-commit hooks

  nf-core-changes:
    runs-on: ubuntu-latest
    outputs:
      modules: ${{ steps.filter.outputs.modules }}
      subworkflows: ${{ steps.filter.outputs.subworkflows }}
    steps:
      - uses: actions/checkout@v6
        with:
          fetch-depth: 2
      
      # Detect which files changed
      - uses: dorny/paths-filter@v3
        id: filter
        with:
          filters: |
            modules:
              - added|modified: 'modules/my-org/**'
            subworkflows:
              - added|modified: 'subworkflows/my-org/**'
      
      # Extract module names from changed files
      - name: Get module names
        id: module_names
        uses: actions/github-script@v8
        with:
          script: |
            return [...new Set(${{ steps.filter.outputs.modules_files }}
              .filter(x => x.endsWith('main.nf'))
              .map(path => path.split('/')[2]))];
      
      # Run nf-core linting on changed modules
      - name: Run nf-core lint
        uses: nf-core/lint-action@v2
        with:
          modules: ${{ steps.module_names.outputs.result }}
```

**Các tính năng chính:**
- **Kiểm soát concurrency**: hủy các lần chạy trước khi có push mới
- **Lọc theo đường dẫn**: chỉ lint những tệp thực sự thay đổi
- **Phát hiện module**: tìm ra module nào đã được chỉnh sửa
- **Tích hợp pre-commit**: chạy mọi pre-commit hook

### 6.2. Workflow nf-test (nf-test.yml)

Workflow nf-test chạy kiểm thử module song song bằng sharding:

```yaml
# .github/workflows/nf-test.yml (simplified)
name: Run nf-test
on:
  push:
    paths-ignore:
      - "**/meta.yml"
  pull_request:
    branches: [main]
  workflow_dispatch:

env:
  NFT_VER: "0.9.3"
  NXF_VER: "25.04.8"
  NXF_ANSI_LOG: false

jobs:
  nf-test-changes:
    name: Detect changes and set shards
    runs-on: ubuntu-latest
    outputs:
      modules: ${{ steps.components.outputs.modules }}
      subworkflows: ${{ steps.components.outputs.subworkflows }}
      shard: ${{ steps.set-shards.outputs.shard }}
      total_shards: ${{ steps.set-shards.outputs.total_shards }}
    steps:
      - uses: actions/checkout@v6
        with:
          fetch-depth: 0
      
      # Detect nf-test files that changed
      - name: List nf-test files
        id: list
        uses: adamrtalbot/detect-nf-test-changes@v0.0.6
        with:
          head: ${{ github.sha }}
          base: ${{ github.event.pull_request.base.sha || 'origin/main' }}
          exclude_tags: "gpu"  # Exclude GPU tests
      
      # Extract module and subworkflow names
      - name: Get changed components
        id: components
        uses: actions/github-script@v8
        with:
          script: |
            const paths = '${{ steps.list.outputs.components }}'.split('\n');
            const modules = paths.filter(p => p.includes('modules/'));
            const subworkflows = paths.filter(p => p.includes('subworkflows/'));
            return { modules, subworkflows };
      
      # Calculate shards for parallel execution
      - name: Calculate shards
        id: set-shards
        uses: nf-core/get-shards-action@v1
        with:
          components: ${{ steps.list.outputs.components }}
          total_shards: 4  # Run tests across 4 parallel jobs
  
  # Run tests in parallel across multiple jobs
  nf-test:
    needs: nf-test-changes
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1, 2, 3, 4]
    steps:
      - uses: actions/checkout@v6
      
      - name: Run nf-test (shard ${{ matrix.shard }}/4)
        uses: nf-core/nf-test-action@v1
        with:
          shard: ${{ matrix.shard }}
          total_shards: 4
          profile: docker
```

**Các tính năng chính:**
- **Sharding**: kiểm thử được phân bổ trên 4 job song song
- **Phát hiện thay đổi**: chỉ chạy kiểm thử cho module thực sự được chỉnh sửa
- **Lọc theo tag**: loại bỏ kiểm thử GPU trên runner tiêu chuẩn
- **Docker profile**: kiểm thử chạy trong container Docker để nhất quán

### 6.3. Sharding hoạt động thế nào

Sharding chia kiểm thử ra các job song song để giảm tổng thời gian chạy:

```
Pull Request with 100 tests
│
├─ Job 1 (Shard 1/4): Tests 1-25    [8 min]
├─ Job 2 (Shard 2/4): Tests 26-50   [8 min]
├─ Job 3 (Shard 3/4): Tests 51-75   [8 min]
└─ Job 4 (Shard 4/4): Tests 76-100  [8 min]
    └─ Total Time: ~8 minutes (vs 32 minutes serial)
```

`get-shards-action` phát hiện các tệp kiểm thử thay đổi và gán chúng vào từng shard.

---

## 7. Khung nf-test và chiến lược kiểm thử

### 7.1. nf-test là gì?

nf-test là khung kiểm thử thiết kế cho Nextflow. Nó cung cấp:
- **Kiểm thử snapshot**: so sánh output với output chuẩn trước đó
- **Xác thực input/output**: kiểm tra hành vi của module
- **Hỗ trợ plugin**: validator cho BAM, VCF và tệp tiện ích
- **Thực thi song song**: chạy kiểm thử đồng thời
- **Tích hợp CI/CD**: tích hợp GitHub Actions

### 7.2. Tệp nf-test.config

```groovy
// nf-test.config
config {
    // Location of all nf-tests
    testsDir "."
    
    // Directory for temporary test files
    workDir System.getenv("NFT_WORKDIR") ?: ".nf-test"
    
    // Optional Nextflow config specific for tests
    configFile "tests/config/nf-test.config"
    
    // Profile to use for tests (docker, singularity, local)
    profile ""
    
    // Load testing plugins for specialized formats
    plugins {
        load "nft-bam@0.6.0"        # BAM file validation
        load "nft-utils@0.0.7"      # Utility functions
        load "nft-vcf@1.0.7"        # VCF file validation
    }
}
```

### 7.3. Viết một tệp kiểm thử

```groovy
// modules/my-org/examplemodule/tests/main.nf.test
nextflow_process {
    
    name "Test EXAMPLEMODULE"
    script "../main.nf"
    process "EXAMPLEMODULE"
    
    test("test_fastqc_single_end") {
        
        when {
            process {
                """
                input[0] = [
                    [id: 'test'],
                    file(params.modules_testdata_base_path + 'genomics/homo_sapiens/fastq/test_1.fastq.gz')
                ]
                """
            }
        }
        
        then {
            assertAll(
                { assert process.success },
                { assert snapshot(process.out).match() }
            )
        }
    }
    
    test("test_fastqc_paired_end") {
        
        when {
            process {
                """
                input[0] = [
                    [id: 'test'],
                    [
                        file(params.modules_testdata_base_path + 'genomics/homo_sapiens/fastq/test_1.fastq.gz'),
                        file(params.modules_testdata_base_path + 'genomics/homo_sapiens/fastq/test_2.fastq.gz')
                    ]
                ]
                """
            }
        }
        
        then {
            assertAll(
                { assert process.success },
                { assert snapshot(process.out).match() },
                { assert file(process.out.html[0][1]).exists() }
            )
        }
    }
}
```

### 7.4. Plugin kiểm thử cho xác thực chuyên biệt

Plugin của nf-test cung cấp các validator chuyên biệt:

```groovy
// VCF validation example
then {
    assertAll(
        { assert process.success },
        { assert file(process.out.vcf[0][1]).vcf.variantCount == 42 },
        { assert file(process.out.vcf[0][1]).vcf.header.samples.size() == 3 }
    )
}

// BAM validation example
then {
    assertAll(
        { assert process.success },
        { assert file(process.out.bam[0][1]).bam.readCount == 1000 },
        { assert file(process.out.bam[0][1]).bam.mapped == 950 }
    )
}
```

### 7.5. Chạy kiểm thử cục bộ

```bash
# Install nf-test
curl -fsSL https://get.nf-test.com | bash
export PATH=$PATH:~/.nf-test/bin

# Configure Nextflow for tests
export NXF_VER="25.04.8"

# Run all tests
nf-test test

# Run tests for a specific module
nf-test test modules/my-org/examplemodule/

# Run tests with Docker profile
nf-test test --profile docker

# Run with verbose output
nf-test test --verbose

# Update snapshots after intentional changes
nf-test test --update-snapshots
```

### 7.6. Quy trình kiểm thử snapshot

```
1. First run:
   └─ Test executes module process
   └─ Outputs saved to .nf-test/modules/*/main.nf.test.snap
   
2. Subsequent runs:
   └─ Test executes module again
   └─ Outputs compared to snapshot
   └─ If outputs match: ✓ Test passes
   └─ If outputs differ: ✗ Test fails (intentional change?)
   
3. After code improvements:
   └─ Developer reviews diffs
   └─ If changes are good: nf-test --update-snapshots
   └─ Snapshots updated, tests pass again
```

Ví dụ tệp snapshot:

```snap
# modules/my-org/examplemodule/tests/main.nf.test.snap

{
  "test_fastqc_single_end": {
    "0": {
      "0": {
        "id": "test"
      },
      "1": [
        {
          "0": "test_fastqc.html"
        },
        {
          "0": "test_fastqc.zip"
        }
      ],
      "2": [
        {
          "0": "versions.yml"
        }
      ]
    }
  }
}
```

---

## 8. Lint và công cụ chất lượng mã

### 8.1. Ruff: lint và định dạng Python

Ruff là trình lint Python viết bằng Rust, kiểm tra:
- Sắp xếp và tổ chức import
- Import không dùng
- Tên chưa định nghĩa
- Vi phạm style mã

Cấu hình trong `ruff.toml`:

```toml
# ruff.toml
[tool.ruff]
line-length = 120
target-version = "py311"

[tool.ruff.lint]
# Select which rules to enforce
select = ["I", "E1", "E4", "E7", "E9", "F", "UP", "N"]
# I: isort (import sorting)
# E1/E4/E7/E9: pycodestyle errors
# F: pyflakes (undefined names, etc.)
# UP: pyupgrade (modern Python syntax)
# N: pep8-naming (variable naming)

ignore = ["E501"]  # Ignore line too long (handled by formatter)

[tool.ruff.format]
quote-style = "double"
indent-style = "space"
line-ending = "auto"
```

Pre-commit chạy ruff:

```bash
# Check for issues
ruff check modules/

# Auto-fix issues
ruff check --fix modules/

# Format code
ruff format modules/
```

### 8.2. Prettier: định dạng YAML và JSON

Prettier định dạng các tệp cấu hình:

```yaml
# .prettierrc.yml
semi: true
singleQuote: false
trailingComma: all
bracketSpacing: true
tabWidth: 2
useTabs: false
```

Prettier áp đặt tính nhất quán ở:
- Thụt lề YAML
- Định dạng JSON
- Ngắt dòng Markdown
- Khoảng cách comment

### 8.3. Hadolint: lint Dockerfile

Hadolint bắt các vi phạm best practice của Docker:

```dockerfile
# ❌ Bad (flagged by hadolint)
FROM ubuntu:latest
RUN apt-get update
RUN apt-get install -y python3
RUN apt-get install -y git

# ✅ Good (passes hadolint)
FROM ubuntu:22.04
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        python3 \
        git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
```

Một số rule phổ biến của hadolint:
- **DL3006**: dùng phiên bản base image cụ thể (không dùng `latest`)
- **DL3009**: xóa cache apt-get để giảm kích thước layer
- **DL3015**: tránh thêm gói với `apt-get install`
- **SC2086**: đặt biến trong dấu ngoặc kép trong lệnh shell

### 8.4. Xác thực JSON Schema

Template xác thực mọi tệp `meta.yml` theo một JSON Schema:

```json
// modules/yaml-schema.json (simplified)
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "nf-core module schema",
  "type": "object",
  "required": ["name", "description", "input", "output"],
  "properties": {
    "name": {
      "type": "string",
      "description": "Module name"
    },
    "description": {
      "type": "string",
      "description": "Module description"
    },
    "keywords": {
      "type": "array",
      "items": { "type": "string" }
    },
    "tools": {
      "type": "object",
      "description": "Tools used in the module"
    },
    "input": {
      "type": "array",
      "description": "Input ports"
    },
    "output": {
      "type": "array",
      "description": "Output ports"
    }
  }
}
```

Xác thực diễn ra trong pre-commit:

```bash
check-jsonschema --schemafile modules/yaml-schema.json modules/my-org/*/meta.yml
```

---

## 9. Ghép tất cả lại: quy trình đầu-cuối

### 9.1. Tạo repository module mới

```bash
# Step 1: Install tools
pipx install copier

# Step 2: Generate repository from template
copier copy gh:nf-core/modules-template ./my-bioinformatics-modules

# Follow prompts:
# repo_host: https://github.com
# repo_org_name: my-research-lab
# short_org_name: mylab
# ci: github
# repo_name: bioinformatics-modules
# description: Nextflow modules for genomic analysis
# copyright_holder: My Research Lab
# default_branch: main

# Step 3: Navigate to generated repository
cd my-bioinformatics-modules

# Step 4: Initialize as git repository
bash ./project_init.sh

# Step 5: Set up pre-commit hooks
pip install pre-commit
pre-commit install

# Step 6: Push to GitHub
git remote add origin https://github.com/my-research-lab/bioinformatics-modules.git
git branch -M main
git push -u origin main
```

### 9.2. Tạo một module mới

```bash
# Copy the example module structure
mkdir -p modules/mylab/my_custom_process
cp -r modules/mylab/examplemodule/{main.nf,meta.yml,environment.yml,tests} modules/mylab/my_custom_process/

# Edit the process
vim modules/mylab/my_custom_process/main.nf

# Edit metadata
vim modules/mylab/my_custom_process/meta.yml

# Edit dependencies
vim modules/mylab/my_custom_process/environment.yml

# Write tests
vim modules/mylab/my_custom_process/tests/main.nf.test
```

### 9.3. Quy trình: thêm → kiểm thử → pre-commit → push → CI/CD

```bash
# 1. Stage changes
git add modules/mylab/my_custom_process/

# 2. Pre-commit hooks run automatically
#    ✓ Prettier formats YAML
#    ✓ Ruff sorts imports and checks Python
#    ✓ JSON schema validates meta.yml
#    ✓ Hadolint checks Dockerfile (if any)
#    If issues found, they're fixed. Review and re-add.

# 3. Commit
git commit -m "feat: add my_custom_process module"

# 4. Push
git push origin main

# 5. GitHub Actions CI/CD runs:
#    a. Lint workflow:
#       - Pre-commit checks
#       - nf-core linting
#       - YAML/JSON validation
#    b. nf-test workflow:
#       - Detects changed tests
#       - Runs tests across 4 shards in parallel
#       - Validates outputs via snapshots

# 6. Pull request review
#    ✓ All checks passed
#    ✓ Module is ready for use
```

### 9.4. Dùng module trong một workflow

```groovy
// workflows/my_pipeline.nf

// Include modules
include { FASTQC } from '../modules/nf-core/fastqc/main'
include { BWA_INDEX; BWA_MEM } from '../modules/nf-core/bwa/main'
include { MY_CUSTOM_PROCESS } from '../modules/mylab/my_custom_process/main'

workflow {
    ch_input = Channel.fromFilePairs("data/{1,2}.fastq.gz")
    
    FASTQC(ch_input)
    
    reference_fasta = file("reference.fa")
    BWA_INDEX(reference_fasta)
    
    BWA_MEM(ch_input, BWA_INDEX.out.index)
    
    MY_CUSTOM_PROCESS(BWA_MEM.out.bam)
}
```

---

## 10. Những điểm chính

1. **Copier cho phép tạo khung tái lập được** — tạo repository module nhất quán bằng một lệnh và vài prompt
2. **Tổ chức repository áp đặt tiêu chuẩn** — module và subworkflow theo một cấu trúc định sẵn với metadata bắt buộc
3. **Pre-commit hook phát hiện vấn đề sớm** — lint, định dạng và xác thực chạy trước khi commit
4. **GitHub Actions tự động hóa CI/CD** — workflow lint và test chạy trên mỗi PR, với kiểm thử chia shard
5. **nf-test cung cấp kiểm thử đáng tin cậy** — kiểm thử snapshot, xác thực BAM/VCF và thực thi song song
6. **Công cụ chất lượng mã duy trì tính nhất quán** — Ruff, Prettier và Hadolint áp đặt quy ước dự án
7. **Mọi thứ khớp với nhau** — Copier + cấu trúc + pre-commit + CI/CD + nf-test

Với nf-modules-template, các nhóm có thể:
- Onboard lập trình viên mới nhanh hơn
- Duy trì chất lượng mã nhất quán giữa các module
- Phát hiện lỗi trước khi lên production
- Chia sẻ module đáng tin cậy trong hệ sinh thái
- Mở rộng lên hàng trăm module

---

## Tài liệu tham khảo

- [nf-core/modules-template](https://github.com/nf-core/modules-template) — repository template chính thức
- [Tài liệu Copier](https://copier.readthedocs.io) — công cụ tạo khung từ template
- [Tài liệu nf-test](https://www.nf-test.com) — khung kiểm thử cho Nextflow
- [Tài liệu GitHub Actions](https://docs.github.com/en/actions) — tự động hóa CI/CD
- [nf-core/modules](https://github.com/nf-core/modules) — repository module cộng đồng
- [Tài liệu Nextflow](https://www.nextflow.io/docs) — workflow engine
- [Tài liệu Ruff](https://docs.astral.sh/ruff) — trình lint và định dạng Python
- [Tài liệu Prettier](https://prettier.io) — trình định dạng mã
- [Tài liệu Hadolint](https://github.com/hadolint/hadolint) — trình lint Dockerfile
