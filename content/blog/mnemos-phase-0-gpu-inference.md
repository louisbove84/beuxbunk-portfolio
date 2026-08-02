---
title: 'Phase 0: GPU Inference on Kubernetes'
date: '2026-08-02'
description: 'The first phase of mnemos, an air-gappable memory layer for AI conversations, is done: one k3s node, one GPU, one OpenAI-compatible endpoint. Here is what shipped and what comes next in the series.'
tags: ['mnemos', 'kubernetes', 'gpu', 'llm-serving', 'homelab']
series: 'Building mnemos'
draft: false
---

I am building [mnemos](https://github.com/louisbove84/mnemos) in the open, one phase at a time. This is the log for Phase 0.

## The problem mnemos exists to solve

1. I want my knowledge base, conversation history, and preferences captured in one place so I can use them with any LLM I want.
2. I want my data secure and air-gapped. Stop slurping up my data.
3. I want a tool that helps me make tough decisions that require in-depth conversations.

The providers that do offer memory keep it in their cloud, tied to their models, on their terms. Mnemos is the opposite bet: a memory layer that runs on hardware I own, remembers across every assistant I use, and keeps working with no internet connection at all.

### Three principles drive the whole design

1. **Local first.** No data leaves the host unless I deliberately send it.
2. **Air-gappable.** The full stack deploys into a disconnected environment from a single bundle.
3. **Provider neutral.** Memory is exposed over Model Context Protocol, so any client can use it.

My intention is to use the latest knowledge storage techniques (ex. bi-temporal knowledge graph) to stores facts as edges so knowledge is referenced as the right time. Nothing is deleted, only superseded.

## The roadmap (why this post is Phase 0)

Mnemos is built in phases on purpose. Each one has a narrow goal, a definition of done, and a clear list of things I am *not* building yet. Reading this series in order should feel like watching the stack grow from "tokens from a GPU" to "air-gapped memory I actually use."

| Phase | Focus | State |
| --- | --- | --- |
| **0** | GPU inference on Kubernetes — one cluster, one model, one OpenAI-compatible HTTP endpoint | **Complete** (this post) |
| **1** | Platform foundation — GitOps (Argo), Helm, observability | Next |
| **2** | Air-gapped delivery — Harbor, Zarf, offline install path | Later |
| **3** | Data platform — MinIO, Spark, Delta Lake | Later |
| **4** | Memory engine — Graphiti, Neo4j, MCP server | Later |
| **5** | Web UI and decision journal | Later |
| **6** | Multi-node cluster, scale-to-zero serving | Later |

Phase 0 only answers: *can I schedule a model on my own GPU and call it over HTTP from my workstation?* 

## Phase 0 goal

**One cluster, one model, one HTTP endpoint.** Curl it from my workstation and get tokens back.

This is my first end-to-end Kubernetes application. The bar was modest: a simple cluster on a separate GPU-enabled Linux laptop on my wifi, reachable from the Mac without SSHing onto the node to run inference by hand.

Two machines, split on purpose so the cluster stays separate from the day-one laptop I develop on — and so the serving host starts approximating the air-gapped story. Details live in the [runbook](https://github.com/louisbove84/mnemos/blob/main/docs/runbooks/phase-0-smoke-test.md).

### Linux GPU laptop (cluster)

- Installed **k3s** as a single-node cluster.
- Installed the **NVIDIA container toolkit** and device plugin so pods can request `nvidia.com/gpu`.
- Dropped model weights under `/srv/mnemos/` and applied a small Deployment that runs llama.cpp's CUDA server with the GPU attached.
- Confirmed the node is Ready and a GPU-requesting pod schedules and sees the device.

### Mac workstation (client)

- Pointed `kubectl` at the laptop cluster (`KUBECONFIG`).
- Port-forwarded the LLM Service to localhost.
- Hit `/v1/chat/completions` with curl and got tokens back.

## What I deliberately did not build

GitOps. Helm. Prometheus. Harbor. Zarf. Graphiti. MCP. All of it is on the roadmap above and none of it is here.

## Next: Phase 1

Platform foundation. GitOps with Argo, Helm charts that parameterize the model and image, and observability so I can see what the cluster is doing without port-forwarding into it. The goal is that nothing gets applied by hand again.

After that, the series moves toward the real product surface: offline delivery (Phase 2), a data plane for transcripts and artifacts (Phase 3), then the temporal memory engine and MCP interface (Phase 4) that the whole project is actually about.

The full phase docs and every ADR live in the [repository](https://github.com/louisbove84/mnemos). 
