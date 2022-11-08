# meetup-nodejs

## Requirements:
- minikube
- kubectl

## How to run
### Using Script
```sh
minikube start
make argocd_up
```

*clean up*
```sh
make argocd_down
```

### Manually
```sh
minikube start

# Argo
kustomize build infrastructure/modules/argocd/overlays | kubectl -n argocd apply -f - # build image
kubectl wait --for=condition=ready pod -l  app.kubernetes.io/name=argocd-server # wait argo be deployed
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo # get password
kubectl -n argocd apply -f infrastructure/modules/argocd/app-of-apps.yaml # deploy app of apps

## test kafka connection
kubectl -n kafka run kafka-producer -ti --image=quay.io/strimzi/kafka:0.32.0-kafka-3.3.1 --rm=true --restart=Never -- bin/kafka-console-producer.sh --bootstrap-server my-cluster-kafka-bootstrap.kafka.svc.cluster.local:9092 --topic my-topic # producer

kubectl -n kafka run kafka-consumer -ti --image=quay.io/strimzi/kafka:0.32.0-kafka-3.3.1 --rm=true --restart=Never -- bin/kafka-console-consumer.sh --bootstrap-server my-cluster-kafka-bootstrap.kafka.svc.cluster.local:9092 --topic my-topic --from-beginning # consumer

# Meetings
docker build -t gbrotas/meetup-meetings:latest -f microservices/meetings/Dockerfile.prod microservices/meetings
docker push gbrotas/meetup-meetings:latest

# Categories
docker build -t gbrotas/meetup-categories:latest -f microservices/categories/Dockerfile.prod microservices/categories
docker push gbrotas/meetup-categories:latest
# kustomize build ./microservices/categories/k8s | kubectl -n categories apply -f -
```

## clean up
```
kustomize build infrastructure/modules/argocd/overlays | kubectl -n argocd delete -f -
```

## Refs:
https://github.com/jkayani/avp-demo-kubecon-2021

## Todo:
- sonarcloud
- categories/meetings retry policies when db/kafka cannot be reached
- create app variants