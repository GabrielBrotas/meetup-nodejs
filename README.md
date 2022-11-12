# meetup-nodejs

## Requirements:
- minikube
- kubectl

## How to run
```sh
minikube start --memory 4000 --cpus 2
# minikube addons enable ingress

make argocd_up
```

*forward ports*
```sh
kubectl port-forward svc/meetings-svc -n meetings 4000:4000
kubectl port-forward svc/categories-svc -n categories 4000:4000
```

*test kafka connection*
```sh
## test kafka connection
kubectl -n kafka run kafka-producer -ti --image=quay.io/strimzi/kafka:0.32.0-kafka-3.3.1 --rm=true --restart=Never -- bin/kafka-console-producer.sh --bootstrap-server my-cluster-kafka-bootstrap.kafka.svc.cluster.local:9092 --topic my-topic # producer

kubectl -n kafka run kafka-consumer -ti --image=quay.io/strimzi/kafka:0.32.0-kafka-3.3.1 --rm=true --restart=Never -- bin/kafka-console-consumer.sh --bootstrap-server my-cluster-kafka-bootstrap.kafka.svc.cluster.local:9092 --topic my-topic --from-beginning # consumer
```

### Build Images
```sh
# Meetings
export MEETINGS_VERSION='1.0.6'

docker build -t gbrotas/meetup-meetings:$MEETINGS_VERSION \
    -t gbrotas/meetup-meetings:latest \
    -f microservices/meetings/Dockerfile.prod microservices/meetings
docker push gbrotas/meetup-meetings --all-tags

# Categories
export CATEGORY_VERSION='1.0.6'
docker build -t gbrotas/meetup-categories:$CATEGORY_VERSION \
    -t gbrotas/meetup-categories:latest \
    -f microservices/categories/Dockerfile.prod microservices/categories

docker push gbrotas/meetup-categories --all-tags
```

## Keycloack
```sh
kubectl apply -f https://raw.githubusercontent.com/keycloak/keycloak-quickstarts/20.0.1/kubernetes-examples/keycloak.yaml

# ingress:
wget -q -O - https://raw.githubusercontent.com/keycloak/keycloak-quickstarts/latest/kubernetes-examples/keycloak-ingress.yaml | \
sed "s/KEYCLOAK_HOST/keycloak.$(minikube ip).nip.io/" | \
kubectl create -f -

# get ingress url:
KEYCLOAK_URL=https://keycloak.$(minikube ip).nip.io &&
echo "" &&
echo "Keycloak:                 $KEYCLOAK_URL" &&
echo "Keycloak Admin Console:   $KEYCLOAK_URL/admin" &&
echo "Keycloak Account Console: $KEYCLOAK_URL/realms/myrealm/account" &&
echo ""
```

### clean up
```sh
make argocd_down
```

## Refs:
https://github.com/jkayani/avp-demo-kubecon-2021

## Todo:
- sonarcloud
- categories/meetings retry policies when db/kafka cannot be reached
- create app variants
- argocd repository credentials
- argocd rollout
- secrets
