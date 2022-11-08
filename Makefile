k8s_up:
	minikube start

k8s_down:
	minikube delete

argo_up:
	kustomize build infrastructure/modules/argocd/overlays | kubectl -n argocd apply -f -
	kubectl wait --for=condition=ready pod -l  app.kubernetes.io/name=argocd-server
	kubectl -n argocd apply -f infrastructure/modules/argocd/app-of-apps.yaml
	kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo

kafka_up:
	kustomize build infrastructure/modules/kafka-operator | kubectl -n kafka apply -f -
	kustomize build infrastructure/modules/kafka-cluster | kubectl -n kafka apply -f -

publish_images:
	eval $(minikube docker-env)

	# Meetings
	docker build -t gbrotas/meetup-meetings:1.0.2 -f microservices/meetings/Dockerfile.prod microservices/meetings
	docker push gbrotas/meetup-meetings:1.0.2

	# Categories
	docker build -t gbrotas/meetup-categories:1.0.2 -f microservices/categories/Dockerfile.prod microservices/categories
	docker push gbrotas/meetup-categories:1.0.2

	
all_up: k8s_up argo_up kafka_up publish_images
	echo "Done !"

clean_up:
	kustomize build infrastructure/modules/kafka-cluster | kubectl -n kafka delete -f -
	kustomize build infrastructure/modules/kafka-operator | kubectl -n kafka delete -f -
	kustomize build infrastructure/modules/argocd/overlays | kubectl -n argocd delete -f -