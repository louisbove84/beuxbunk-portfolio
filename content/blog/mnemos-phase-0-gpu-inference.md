---
title: 'Phase 0: GPU Inference on Kubernetes'
date: '2026-08-02'
description: 'The first phase of mnemos, an air-gappable memory layer for AI conversations, is done: one k3s node, one GPU, one OpenAI-compatible endpoint. Here is what shipped and what I deliberately left out.'
tags: ['mnemos', 'kubernetes', 'gpu', 'llm-serving', 'homelab']
series: 'Building mnemos'
draft: false
---

I am building [mnemos](https://github.com/louisbove84/mnemos) in the open, one phase at a time. This is the log for Phase 0.

## The problem mnemos exists to solve

Every conversation with an AI assistant starts amnesiac. The providers that do offer memory keep it in their cloud, tied to their models, on their terms. mnemos is the opposite bet: a memory layer that runs on hardware I own, remembers across every assistant I use, and keeps working with no internet connection at all.

Three principles drive the whole design:

1. **Local first.** No data leaves the host unless I deliberately send it.
2. **Air-gappable.** The full stack deploys into a disconnected environment from a single bundle.
3. **Provider neutral.** Memory is exposed over Model Context Protocol, so any client can use it.

The storage decision matters more than it looks. The obvious implementation is to embed every message and retrieve by similarity, which is what most retrieval systems do. It fails in a specific way here: similarity search has no representation of *change*. "I plan to relocate in 2028" is not a document to embed. It is a claim with a lifespan, and a later conversation may invalidate it. Ask a vector store about relocation and it hands back both the old and the new statement with no way to tell which is current.

So mnemos stores facts as edges in a bi-temporal knowledge graph, each carrying both a valid time (when it became true) and a transaction time (when the system learned it). Nothing is deleted, only superseded. That makes the question I actually care about answerable:

> What did I believe about this decision six months ago, and what changed?

That is Phase 4. None of it matters if I cannot get a model to answer an HTTP request on my own hardware first.

## What Phase 0 scoped down to

**Goal:** one cluster, one model, one HTTP endpoint. Curl it from my workstation and get tokens back.

That is the entire phase. The temptation with a project like this is to start with the interesting part. I started with the least interesting part on purpose, because everything downstream assumes a working inference endpoint, and I would rather discover hardware problems now than in Phase 4 with a graph database and an MCP server in the mix.

Two machines:

| Machine | Role |
| --- | --- |
| Linux GPU laptop | k3s single-node cluster, NVIDIA container toolkit, model weights under `/srv/mnemos/` |
| Mac workstation | `kubectl`, port-forward, smoke-test curls |

The split is deliberate. Authoring happens in a dev container on the Mac; serving happens on Linux hardware with the GPU. Keeping those separate from day one means I never accidentally write code that assumes the model is running on localhost.

## Where the plan met the hardware

The original plan assumed vLLM. The GPU available to me is an NVIDIA GeForce GTX 1050: Pascal, compute capability 6.1, 4 GB of VRAM. Current upstream vLLM builds need substantially newer compute capability and will not run on that card without a custom fork.

I could have bought a GPU. Instead I changed the contract.

The insight is that nothing downstream should care which engine serves the model. Extraction, MCP tools, and local test stubs need a stable HTTP contract, not a specific runtime. So the decision recorded in [ADR 0004](https://github.com/louisbove84/mnemos/blob/main/docs/adr/0004-openai-compatible-serving.md) is to serve behind an **OpenAI-compatible** API — `/v1/models` and `/v1/chat/completions` — and let the implementation be whatever the hardware supports today. Right now that is llama.cpp's CUDA server with a small quantized GGUF model that fits in 4 GB:

```yaml
spec:
  runtimeClassName: nvidia
  containers:
    - name: llama
      image: ghcr.io/ggml-org/llama.cpp:server-cuda
      args:
        - '--model'
        - '/models/qwen2.5-0.5b/qwen2.5-0.5b-instruct-q4_k_m.gguf'
        - '--host'
        - '0.0.0.0'
        - '--port'
        - '8000'
        - '--n-gpu-layers'
        - '99'
      resources:
        limits:
          nvidia.com/gpu: '1'
          memory: '6Gi'
```

Three things in that manifest are the actual substance of the phase. `runtimeClassName: nvidia` routes the pod to the NVIDIA container runtime. The `nvidia.com/gpu` limit is what the device plugin advertises, so the scheduler treats the GPU as a real, countable resource instead of something the container hopes to find. And `--n-gpu-layers 99` pushes every layer it can onto the card.

When better hardware shows up, the container behind that Service gets swapped for vLLM and no client changes. Phase 1 will parameterize the image and model path in Helm values so that swap is a configuration change rather than a redesign.

## Proving it works

The bar I set was specific: get a chat completion **without SSHing onto the node to run inference by hand**. Anything less means I proved the model loads, not that the platform serves.

```bash
export KUBECONFIG=~/.kube/mnemos-laptop.yaml
kubectl apply -f deploy/manifests/llm.yaml
kubectl get pods -l app=llm

kubectl port-forward svc/llm 8000:8000
```

Then, from a second terminal on the Mac:

```bash
curl -s http://127.0.0.1:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "/models/qwen2.5-0.5b/qwen2.5-0.5b-instruct-q4_k_m.gguf",
    "messages": [
      {"role": "user", "content": "Say hello in one short sentence."}
    ],
    "max_tokens": 64,
    "temperature": 0.2
  }' | python3 -m json.tool
```

Tokens came back. A few seconds of latency on a laptop GPU is normal, and a 0.5B model is not going to impress anyone on quality. Neither is the point. The point is that the path from workstation to scheduled GPU pod to HTTP response works end to end, and it is written down as a [runbook](https://github.com/louisbove84/mnemos/blob/main/docs/runbooks/phase-0-smoke-test.md) I can re-run after any change.

Phase 0 is done when three boxes are checked, and all three are:

- Node reports Ready from the workstation
- A GPU-requesting pod schedules and sees the device
- Chat completion over HTTP, no manual inference on the node

## What I deliberately did not build

GitOps. Helm. Prometheus. Harbor. Zarf. Graphiti. MCP. All of it is on the roadmap and none of it is here.

The manifest above gets applied by hand with `kubectl apply`. That is a bad habit and I am keeping it for exactly one phase, because Phase 1 exists to replace it. Writing the out-of-scope list into the phase document is the part that actually keeps me honest — it turns "I'll get to that" into a tracked decision rather than an accumulating pile of things I forgot I skipped.

The other deliberate constraint: architecture is modelled in C4 with Structurizr, and every consequential decision becomes an [ADR](https://github.com/louisbove84/mnemos/tree/main/docs/adr) before code follows. The vLLM-to-llama.cpp switch is a good example of why. Six months from now, "why is this not vLLM?" has a written answer with the hardware constraint attached, instead of being archaeology.

## Next: Phase 1

Platform foundation. GitOps with Argo, Helm charts that parameterize the model and image, and observability so I can see what the cluster is doing without port-forwarding into it. The goal is that nothing gets applied by hand again.

The full phase roadmap and every ADR live in the [repository](https://github.com/louisbove84/mnemos). It is Apache 2.0 and early.
