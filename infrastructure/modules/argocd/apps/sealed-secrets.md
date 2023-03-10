apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: sealed-secrets
  namespace: argocd
  labels:
    name: sealed-secrets
spec:
  project: default

  source:
    repoURL: https://github.com/GabrielBrotas/meetup-microservices 
    targetRevision: HEAD
    path: infrastructure/modules/sealed-secrets

    kustomize:
      commonLabels:
        project: meetup

  destination:
    server: https://kubernetes.default.svc
    namespace: kafka

  syncPolicy:
    automated:
      prune: true
      selfHeal: true
      allowEmpty: false
    syncOptions:     
    - Validate=false 
    - PrunePropagationPolicy=foreground
    - PruneLast=true 
