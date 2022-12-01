0. (Optional) if you want to deploy without argocd
```sh
kustomize build infrastructure/modules/sealed-secrets | kubectl apply -f -
```

1. verify if controller is running
```sh
kubectl get pods -n kube-system | grep sealed-secrets-controller
```

2. get cert
```sh
kubeseal --fetch-cert > public-cert.pem
```

3. encrypt
```sh
kubeseal --cert public-cert.pem --format=yaml < microservices/auth/k8s/overlays/local/secrets.dec.yaml > microservices/auth/k8s/overlays/local/secrets.enc.yaml

kubeseal --cert public-cert.pem --format=yaml < microservices/meetings/k8s/overlays/local/secrets.dec.yaml > microservices/meetings/k8s/overlays/local/secrets.enc.yaml

kubeseal --cert public-cert.pem --format=yaml < microservices/categories/k8s/overlays/local/secrets.dec.yaml > microservices/categories/k8s/overlays/local/secrets.enc.yaml

# deploy app
kustomize build microservices/auth/k8s/overlays/local | kubectl apply -f -
```