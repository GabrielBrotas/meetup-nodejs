k8s_up:
	minikube start

k8s_down:
	minikube delete

build_images:
	docker build -t gbrotas/meetup-categories:latest -f ./microservices/categories/Dockerfile.prod .
	
	docker build -t gbrotas/meetup-meetings:latest microservices/meetings/Dockerfile.prod .