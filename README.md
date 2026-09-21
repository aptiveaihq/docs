# AptiveAI Docs

Source for the AptiveAI documentation site: product guides, agent and
integration references, and onboarding material for the companies adopting
AptiveAI's products.

## The company and its products

AptiveAI is the company — legal entity Aptive AI LLC, `aptiveai.io`, GitHub org
`aptiveaihq`. The names below were locked on 2026-09-06; the decision of record
is `docs/business/products.md` in
[`aptiveaihq/core`](https://github.com/aptiveaihq/core).

| Name | What it is | Documented here |
| --- | --- | --- |
| **ClusterCode** | The software-field product, for engineering teams. Keeps its own name and its own brand | No — it has its own docs site |
| **AptiveAI Connect** | The customer's existing ChatGPT or Claude, connected to their systems through AptiveAI Connectors. Live and paid today | Yes |
| **AptiveAI Agents** | Configured agents on isolated machines with a browser and a desktop, computer-vision based, in any field. Built in `aptiveaihq/core` and delivered by its console | Yes |
| **AptiveAI Connectors** | The integration software behind both products: typed API clients, Azure Functions APIs and MCP servers, deployed per customer | Reference material, yes; it is never sold on its own |
| **AI Assessment** | The process, on-site or as a questionnaire on aptiveai.io, that leads a company into Connect or Agents. Not a product | Only as the first step of getting started |

In the console the customer sees **integrations**. "AptiveAI Connectors" is the
name of the software behind them, used in prose, proposals and the sales
process; lowercase "connector" is the engineering word inside the code.

## Status

Scaffolded (2026-09-21): an Astro + Starlight site following the same setup as
the [clustercode docs](https://github.com/clustercodehq/docs), deployed to
[`docs.aptiveai.io`](https://docs.aptiveai.io) by GitHub Actions
(`.github/workflows/deploy-docs.yml` → GitHub Pages). The landing page and a
Getting Started stub are live; the detailed content in the Scope below is still
to be written.

```bash
pnpm install
pnpm dev      # local dev server
pnpm build    # production build (what the deploy workflow runs)
```

Brand assets (logos, favicon) are copied verbatim from
`aptiveaihq/core` `docs/branding/latest/`; the color tokens in
`src/styles/custom.css` mirror the palette recorded in that repository's
`docs/branding/README.md` (navy `#0d52b2`, navy shade `#0b3d92`, flat gold
`#d4a520`).

## Scope

- **Getting started** — the AI Assessment, then connecting a first system and
  putting an agent on it
- **AptiveAI Connect** — what the customer's own ChatGPT or Claude can reach
  once it is connected, and what it cannot
- **AptiveAI Agents** — browser and computer-use capabilities, what an agent can
  drive, the live view, schedules, approvals, and the limits of each
- **Integrations** — connecting internal systems: the available MCP servers and
  clients, and what a new one costs
- **Operations** — deployment, access control, observability

## Related repositories

| Repository | Purpose |
| --- | --- |
| [`aptiveaihq/core`](https://github.com/aptiveaihq/core) | **AptiveAI Agents** — the console, the control plane, and the agent runtime — plus the company's public site and account plane |
| [`aptiveaihq/connectors`](https://github.com/aptiveaihq/connectors) | **AptiveAI Connectors** — Azure Functions APIs, typed clients, and MCP servers for customer systems. Renamed from `aptiveaihq/integrations` on 2026-09-06 |
