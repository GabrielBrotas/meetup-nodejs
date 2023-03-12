apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: kafka-cluster
  namespace: argocd
  labels:
    name: kafka-cluster
spec:
  project: default

  source:
    repoURL: https://github.com/GabrielBrotas/meetup-microservices
    targetRevision: HEAD
    path: ./infrastructure/modules/kafka-cluster

    kustomize:
      commonLabels:
        project: meetup

  destination:
    name: in-cluster
    namespace: kafka

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
      limit: -1
      backoff:
        duration: 30s
        factor: 2
        maxDuration: 3m
