start-minikube:
	minikube start --memory 4000 --cpus 2

start-argocd:
	@echo "Starting ArgoCD..."
	
	@if [ -f "infrastructure/modules/argo-cd/charts/argo-cd-5.16.1.tgz" ]; then\
        helm dependency build ./infrastructure/modules/argo-cd;\
    fi

	helm install argo-cd -n argocd \
		--create-namespace ./infrastructure/modules/argo-cd

	kubectl wait --for=condition=ready --timeout=300s pod -l app.kubernetes.io/name=argocd-server -n argocd

	kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo

start-kafka:
	@echo "Starting Kafka..."
	kubectl create ns kafka
	kubectl apply -n kafka -k ./infrastructure/modules/kafka-operator
	
	kubectl apply -n kafka -k ./infrastructure/modules/kafka-cluster

IMAGE_TAG ?= latest
build-images:
	@echo "Building Images"
	@eval $$(minikube docker-env) && \
		docker build -t gbrotas/meetup-categories:$(IMAGE_TAG) \
			-f microservices/categories/Dockerfile microservices/categories && \
		docker build -t gbrotas/meetup-meetings:$(IMAGE_TAG) \
			-f microservices/meetings/Dockerfile microservices/meetings

stop-minikube:
	@echo "Stopping Minikube..."
	minikube stop
	minikube delete

forward-ports:
	@echo "Forwarding Ports..."

	kubectl -n argocd port-forward svc/argo-cd-argocd-server 8080:443
	
# Targets
up: start-minikube start-argocd start-kafka
down: stop-minikube

.PHONY: up down start-minikube start-argocd start-kafka forward-ports stop-minikube