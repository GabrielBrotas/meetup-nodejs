apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: keycloak
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
  labels:
    name: keycloak
spec:
  project: default

  source:
    repoURL: https://github.com/GabrielBrotas/meetup-microservices 
    targetRevision: HEAD
    path: infrastructure/modules/keycloak/overlays/local

    kustomize:
      commonLabels:
        project: meetup

  destination:
    server: https://kubernetes.default.svc
    namespace: keycloak

  syncPolicy:
    automated:
      prune: true
      selfHeal: true
      allowEmpty: false
    syncOptions:     
    - Validate=false 
    - CreateNamespace=true 
    - PrunePropagationPolicy=foreground
    - PruneLast=true 

    retry:
      limit: 10
      backoff:
        duration: 5s
        factor: 2 
        maxDuration: 3m