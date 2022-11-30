## Locally
```sh
# Deploy
minikube addons enable ingress

kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=120s

# 
kubectl get ingress -n auth # get host address

# add to the end of you /etc/hosts
sudo nano /etc/hosts

# End of section
192.168.49.2 http://auth.meetup
```