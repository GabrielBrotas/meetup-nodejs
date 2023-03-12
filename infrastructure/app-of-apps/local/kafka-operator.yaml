apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: kafka-operator
  namespace: argocd
  labels:
    name: kafka-operator
spec:
  project: default

  source:
    repoURL: https://github.com/GabrielBrotas/meetup-microservices
    targetRevision: HEAD
    path: ./infrastructure/modules/kafka-operator

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
      limit: 5
      backoff:
        duration: 5s
        factor: 2
        maxDuration: 3m
