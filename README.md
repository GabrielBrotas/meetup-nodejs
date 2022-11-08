# meetup-nodejs

## Requirements:
- minikube
- kubectl

## How to run - Manual
```sh
minikube start

# Argo
kustomize build infrastructure/modules/argocd/overlays | kubectl -n argocd apply -f - # build image
kubectl wait --for=condition=ready pod -l  app.kubernetes.io/name=argocd-server # wait argo be deployed
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo # get password
kubectl -n argocd apply -f infrastructure/modules/argocd/app-of-apps.yaml # deploy app of apps

kubectl port-forward svc/argocd-server -n argocd 8080:443
	kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo
# Kafka
kustomize build infrastructure/modules/kafka-operator | kubectl -n kafka apply -f -
kustomize build infrastructure/modules/kafka-cluster | kubectl -n kafka apply -f -

kubectl wait kafka/my-cluster --for=condition=Ready --timeout=300s -n kafka  # wait connection

# test kafka connection
kubectl -n meetings run kafka-producer -ti --image=quay.io/strimzi/kafka:0.32.0-kafka-3.3.1 --rm=true --restart=Never -- bin/kafka-console-producer.sh --bootstrap-server my-cluster-kafka-bootstrap:9092 --topic my-topic # producer

kubectl -n kafka run kafka-consumer -ti --image=quay.io/strimzi/kafka:0.32.0-kafka-3.3.1 --rm=true --restart=Never -- bin/kafka-console-consumer.sh --bootstrap-server my-cluster-kafka-bootstrap:9092 --topic my-topic --from-beginning # consumer

eval $(minikube docker-env)

# Meetings
docker build -t gbrotas/meetup-meetings:latest -f microservices/meetings/Dockerfile.prod microservices/meetings
kustomize build ./microservices/meetings/k8s | kubectl -n meetings apply -f -

# Categories
docker build -t gbrotas/meetup-categories:1.0.2 -f microservices/categories/Dockerfile.prod microservices/categories
kustomize build ./microservices/categories/k8s | kubectl -n categories apply -f -

```

## clean up
```
kustomize build infrastructure/modules/argocd/overlays | kubectl -n argocd delete -f -
kustomize build ./microservices/meetings/k8s | kubectl -n meetings delete -f -
kustomize build infrastructure/modules/kafka-operator | kubectl -n kafka delete -f -
kustomize build infrastructure/modules/kafka-cluster | kubectl -n kafka delete -f -
kustomize build ./microservices/categories/k8s | kubectl -n categories delete -f -
kustomize build ./microservices/meetings/k8s | kubectl -n meetings delete -f -
```

## Refs:
https://github.com/jkayani/avp-demo-kubecon-2021

## Todo:
- sonarcloud
- create app variants