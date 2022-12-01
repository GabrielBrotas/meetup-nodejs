argocd_up:
	kustomize build infrastructure/modules/argocd/overlays | kubectl -n argocd apply -f -

	kubectl wait --for=condition=ready --timeout=300s pod -l app.kubernetes.io/name=argocd-server -n argocd
	
	kubectl -n argocd apply -f infrastructure/modules/argocd/app-of-apps.yaml
	
	kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo

get_sealed_secrets_cert:
	kubectl get pods -n kube-system | grep sealed-secrets-controller
	kubeseal --fetch-cert > public-cert.pem

encrypt_all:
	kubeseal --cert public-cert.pem --format=yaml < microservices/auth/k8s/overlays/local/secrets.dec.yaml > microservices/auth/k8s/overlays/local/secrets.enc.yaml

	kubeseal --cert public-cert.pem --format=yaml < microservices/meetings/k8s/overlays/local/secrets.dec.yaml > microservices/meetings/k8s/overlays/local/secrets.enc.yaml

	kubeseal --cert public-cert.pem --format=yaml < microservices/categories/k8s/overlays/local/secrets.dec.yaml > microservices/categories/k8s/overlays/local/secrets.enc.yaml

git_push:
	git add .
	git commit -m "update: secrets values with sealed secrets"
	git push

all_up: argocd_up get_sealed_secrets_cert encrypt_all git_push
	kubectl port-forward svc/argocd-server -n argocd 8080:443

all_down:
	minikube delete

argocd_down:
	kustomize build infrastructure/modules/argocd/overlays | kubectl -n argocd delete -f -