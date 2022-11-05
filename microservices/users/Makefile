up_dev:
	@echo "Starting docker-compose server"
	docker-compose up -d --build
	@echo "Server started"

run_dev:
	docker exec -it users-svc go run cmd/api/*.go

ssh:
	docker exec -it users-svc bash

up:
	@echo "Starting go server"
	go run ./cmd/api/main.go

build:
	go build -o ./bin/app