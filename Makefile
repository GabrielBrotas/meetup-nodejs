start-argocd:
	@echo "Starting ArgoCD..."
	
	## instal ArgoCD
	helm dependency build ./infrastructure/modules/argo-cd
	kubectl create ns argocd
	helm install argo-cd -n argocd ./infrastructure/modules/argo-cd

	kubectl wait --for=condition=ready --timeout=300s pod -l app.kubernetes.io/name=argocd-server -n argocd

	kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo

start-minikube:
	minikube start --memory 4000 --cpus 2

start-kafka:
	@echo "Starting Kafka..."
	kubectl create ns kafka
	kubectl apply -n kafka -k ./infrastructure/modules/kafka-operator
	
	kubectl wait --for=condition=ready --timeout=300s pod -l app.kubernetes.io/name=argocd-server -n argocd
	
	kubectl apply -n kafka -k ./infrastructure/modules/kafka-cluster

stop-minikube:
	@echo "Stopping Minikube..."
	minikube stop
	minikube delete

# Targets
up: start-minikube start-argocd start-kafka
down: stop-minikube

.PHONY: up start-argocd start-minikube stop-minikube start-kafka