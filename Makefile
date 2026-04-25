.PHONY: docker-db stop-db migrate dev start-dev-db help

# PostgreSQL Docker configuration
POSTGRES_VERSION=16-alpine
POSTGRES_CONTAINER_NAME=gianglabs-postgres
POSTGRES_PORT=5433
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=gianglabs
POSTGRES_HOST=localhost

# Start PostgreSQL in Docker (uses port 5433 to avoid conflicts)
docker-db:
	@echo "Starting PostgreSQL in Docker on port 5433..."
	@docker run -d \
		--name $(POSTGRES_CONTAINER_NAME) \
		-e POSTGRES_USER=$(POSTGRES_USER) \
		-e POSTGRES_PASSWORD=$(POSTGRES_PASSWORD) \
		-e POSTGRES_DB=$(POSTGRES_DB) \
		-p $(POSTGRES_PORT):5432 \
		-v gianglabs_postgres:/var/lib/postgresql/data \
		postgres:$(POSTGRES_VERSION)
	@echo "PostgreSQL started at $(POSTGRES_HOST):$(POSTGRES_PORT)"
	@echo "Waiting 3 seconds for database to be ready..."
	@sleep 3
	@echo "Database is ready!"

# Stop PostgreSQL container
stop-db:
	@echo "Stopping PostgreSQL container..."
	@docker stop $(POSTGRES_CONTAINER_NAME) 2>/dev/null || true
	@docker rm $(POSTGRES_CONTAINER_NAME) 2>/dev/null || true
	@echo "PostgreSQL stopped"

# Run Prisma migrations
migrate:
	@echo "Running Prisma migrations..."
	@npx prisma migrate dev

# Start development server
dev:
	@echo "Starting Next.js development server..."
	@npm run dev

# Start everything (Docker + Migrations + Dev Server)
start-dev-db: docker-db migrate dev

# Help command
help:
	@echo "Available commands:"
	@echo "  make docker-db     - Start PostgreSQL in Docker"
	@echo "  make stop-db       - Stop PostgreSQL container"
	@echo "  make migrate       - Run Prisma migrations"
	@echo "  make dev           - Start Next.js dev server"
	@echo "  make start-dev-db  - Start Docker DB, run migrations, and start dev server"
	@echo "  make help          - Show this help message"
	@echo ""
	@echo "PostgreSQL Configuration:"
	@echo "  Host:     $(POSTGRES_HOST)"
	@echo "  Port:     $(POSTGRES_PORT)"
	@echo "  User:     $(POSTGRES_USER)"
	@echo "  Database: $(POSTGRES_DB)"