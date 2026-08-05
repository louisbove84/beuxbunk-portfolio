---
title: 'Phase 1: Platform Foundation'
date: '2026-08-05'
description: 'Phase 1 of mnemos is done: Helm charts, Argo CD GitOps, and Prometheus/Grafana on the same k3s GPU node. Nothing gets applied by hand again — and the cluster is visible from a browser.'
tags: ['mnemos', 'kubernetes', 'gitops', 'argo-cd', 'observability', 'homelab']
series: 'Building mnemos'
draft: false
---

I am building [mnemos](https://github.com/louisbove84/mnemos) in the open, one phase at a time. This is the log for Phase 1.

## Where we left off

[Phase 0](/blog/mnemos-phase-0-gpu-inference) stood up GPU inference on a k3s laptop and a Mac client to call it.

## The roadmap

| Phase | Focus | State |
| --- | --- | --- |
| **0** | GPU inference on Kubernetes — one cluster, one model, one OpenAI-compatible HTTP endpoint | Complete |
| **1** | Platform foundation — GitOps (Argo), Helm, observability | **Complete** (this post) |
| **2** | Air-gapped delivery — Harbor, Zarf, offline install path | Next |
| **3** | Data platform — MinIO, Spark, Delta Lake | Later |
| **4** | Memory engine — Graphiti, Neo4j, MCP server | Later |
| **5** | Web UI and decision journal | Later |
| **6** | Multi-node cluster, scale-to-zero serving | Later |

## Phase 1 goal

**Stop deploying.** Change a file, merge it to `main`, and the cluster catches up on its own — then see that it did, from a browser, without port-forwarding into pods.

## What I set up (high level)

Same two-machine split as Phase 0. Details live in the [bootstrap runbook](https://github.com/louisbove84/mnemos/blob/main/docs/runbooks/phase-1-bootstrap.md).

### On the Linux GPU laptop (cluster)

- Turned the Phase 0 LLM manifest into a **Helm chart** so image, model path, and context size are values, not edits to a Deployment.
- Installed **Argo CD** once with Helm (the only hand install that remains).
- Pointed a root **App-of-Apps** Application at the repo so child apps for the model and observability are discovered from git.
- Installed **kube-prometheus-stack** (Prometheus + Grafana) plus NVIDIA’s **dcgm-exporter** for GPU metrics.
- Exposed Argo and Grafana through k3s’s bundled **Traefik** on hostnames (`argocd.mnemos.local`, `grafana.mnemos.local`).

### On the Mac workstation

- Kept `kubectl` pointed at the laptop.
- Added those hostnames to `/etc/hosts`.
- Opened Argo and Grafana in the browser — no port-forward for day-to-day use.
- Proved the loop: merged a one-line values change (context window 2048 → 4096) and watched the node redeploy in about thirty seconds with no `kubectl apply`.

## Decisions that shaped the phase

Two ADRs landed before the charts:

- [ADR 0005](https://github.com/louisbove84/mnemos/blob/main/docs/adr/0005-gitops-with-argo-cd.md) — Argo CD in an App-of-Apps layout. Argo does not manage itself; upgrading it stays a deliberate Helm command.
- [ADR 0006](https://github.com/louisbove84/mnemos/blob/main/docs/adr/0006-observability-stack.md) — kube-prometheus-stack, with Alertmanager off and the k3s-incompatible control-plane scrapes disabled. Components opt into scraping via `ServiceMonitor` in their own charts.

## Next: Phase 2

Air-gapped delivery. Package the charts and images so the same stack can install with no path to `github.com` or public registries. That is where ADR 0005’s open question lands: GitOps that polls the public internet is in tension with a disconnected install, and Phase 2 has to resolve it.

After that: data plane, then the temporal memory engine and MCP interface the project is actually about.

The phase doc, runbooks, and ADRs live in the [repository](https://github.com/louisbove84/mnemos).
