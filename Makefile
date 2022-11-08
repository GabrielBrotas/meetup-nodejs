argocd_up:
	kustomize build infrastructure/modules/argocd/overlays | kubectl -n argocd apply -f -
	kubectl wait --for=condition=ready --timeout=300s pod -l app.kubernetes.io/name=argocd-server -n argocd
	kubectl -n argocd apply -f infrastructure/modules/argocd/app-of-apps.yaml
	kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo

argocd_down:
	kustomize build infrastructure/modules/argocd/overlays | kubectl -n argocd delete -f -