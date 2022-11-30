# meetup-nodejs

## Requirements:
- minikube
- kubectl
- kubeseal

## How to run
1. create a `infrastructure/modules/argocd/overlays/repository-secret.yaml` file using `repository-secret.example.yaml` as template and fill out the proper values

2.
```sh
minikube start --memory 4000 --cpus 2

make argocd_up
```

*forward ports*
```sh
kubectl port-forward svc/keycloak -n keycloak 8081:8080
kubectl port-forward svc/meetings-svc -n meetings 4000:4000
kubectl port-forward svc/categories-svc -n categories 4001:4001
kubectl port-forward -n auth svc/auth-svc 4002:4002
```

*test kafka connection*
```sh
## test kafka connection
kubectl -n kafka run kafka-producer -ti --image=quay.io/strimzi/kafka:0.32.0-kafka-3.3.1 --rm=true --restart=Never -- bin/kafka-console-producer.sh --bootstrap-server my-cluster-kafka-bootstrap.kafka.svc.cluster.local:9092 --topic my-topic # producer

kubectl -n kafka run kafka-consumer -ti --image=quay.io/strimzi/kafka:0.32.0-kafka-3.3.1 --rm=true --restart=Never -- bin/kafka-console-consumer.sh --bootstrap-server my-cluster-kafka-bootstrap.kafka.svc.cluster.local:9092 --topic my-topic --from-beginning # consumer
```

### Build Images
```sh
# Categories
export CATEGORY_VERSION='1.0.8'
docker build -t gbrotas/meetup-categories:$CATEGORY_VERSION \
    -t gbrotas/meetup-categories:latest \
    -f microservices/categories/Dockerfile.prod microservices/categories

docker push gbrotas/meetup-categories --all-tags

# Meetings
export MEETINGS_VERSION='1.1.10'

docker build -t gbrotas/meetup-meetings:$MEETINGS_VERSION \
    -f microservices/meetings/Dockerfile.prod microservices/meetings

docker push gbrotas/meetup-meetings:$MEETINGS_VERSION

# Auth
export AUTH_VERSION='1.0.1'
docker build -t gbrotas/meetup-auth:$AUTH_VERSION \
    -t gbrotas/meetup-auth:latest \
    -f microservices/auth/Dockerfile microservices/auth

docker push gbrotas/meetup-auth:$AUTH_VERSION
```

### clean up
```sh
make argocd_down
```

## Refs:
https://github.com/jkayani/avp-demo-kubecon-2021

## Todo:
- [ ] Sonarcloud?
- [X] categories/meetings retry policies when db/kafka cannot be reached
- [X] create app variants
- [X] keycloak - cloud
- [X] secrets
- [ ] microservices auth with keycloak
- [ ] argocd rollout
- [ ] service mesh?
- [ ] opentelemetry/datadog?/prometheus?