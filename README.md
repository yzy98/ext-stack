# ExtStack

Launch AI-powered browser extensions with a complete SaaS backend from a single monorepo.

## Why?

Most founders building AI browser extensions eventually run into the same problems:

- User authentication
- Subscription management
- Usage tracking
- AI quotas and rate limits
- Cross-browser publishing
- Shared APIs and types
- User settings sync

Existing solutions are usually either:

- SaaS boilerplates (web-first)
- Extension boilerplates (extension-only)

ExtStack is built specifically for **extension-first products**.

## Current Status

Implemented:

- apps/web: Vite + React + TanStack Router + TanStack Query
- apps/server: Hono on Cloudflare Workers
- apps/extension: WXT + React + TanStack Query
- packages/ui: shared shadcn UI package
- packages/api: Hono RPC client package
- packages/db: Drizzle ORM + PostgreSQL
- packages/auth: Better Auth
- Tooling: pnpm workspace, Turborepo, TypeScript, Ultracite, and Biome

Planned:

- packages/billing: Stripe Billing
- packages/ai: AI provider integrations and usage tracking
- RAG infrastructure for page-aware and user-memory browser extensions

## Local Development

Copy the local environment examples:

```bash
cp apps/web/.env.example apps/web/.env
cp apps/server/.dev.vars.example apps/server/.dev.vars
cp apps/extension/.env.example apps/extension/.env
```

Start the development servers:

```bash
pnpm dev
```

Run checks before committing:

```bash
pnpm check
pnpm typecheck
pnpm build
```

## Architecture

### Monorepo Architecture

```txt
apps/
  web
  extension
  server

packages/
  ui
  api
  auth
  billing
  ai
  db
  analytics
  shared
```

### Tech Stack

- Monorepo: pnpm workspace + Turborepo
- Web app: Vite + React + TanStack Router + TanStack Query
- Browser extension: WXT + React + TanStack Query
- UI: Tailwindcss + shadcn
- API: Hono + Hono RPC on Cloudflare Workers
- Database: PostgreSQL + Drizzle ORM
- Authentication: Better Auth
- Billing: Stripe Billing
- Shared packages: TypeScript types, API clients, schemas, and UI primitives
- Code quality: TypeScript + Ultracite + Biome

## Roadmap

### Authentication

- Extension login
- Web dashboard login
- Shared session management
- JWT refresh flow
- Protected APIs

### Billing

- Stripe subscriptions
- Usage-based plans
- Feature gating
- Team plans
- Customer portal

### AI Infrastructure

- OpenAI
- Anthropic
- Gemini
- Token tracking
- Rate limiting
- User quotas
- RAG ingestion and retrieval
- Embeddings and vector search
- Per-user memory stores
- Source attribution

### RAG Use Cases

ExtStack is a natural foundation for RAG-powered browser extension products because
the extension can capture useful page context while the backend handles auth,
storage, retrieval, billing, quotas, and AI provider access.

Possible RAG product directions:

- Current page assistant: summarize, explain, rewrite, or answer questions about
  the page the user is viewing.
- Selected text assistant: run AI actions against highlighted content from any
  website.
- Personal web memory: let users save pages, snippets, PDFs, emails, or research
  notes, then ask questions across their saved knowledge.
- Research assistant: collect sources while browsing and generate answers with
  citations back to saved pages.
- Team knowledge copilot: combine browser context with shared company docs,
  bookmarks, SOPs, CRM notes, or support knowledge.
- Vertical copilots: build Gmail, YouTube, LinkedIn, GitHub, Twitter/X, or
  documentation assistants that retrieve from both the active page and stored
  user knowledge.

Suggested RAG architecture:

```txt
apps/extension
  content scripts: extract page content, selected text, metadata
  popup UI: ask current page, save to memory, search saved sources

apps/server
  /rag/ingest
  /rag/query
  /rag/sources
  /ai/chat

packages/ai
  embeddings
  retrieval
  answer generation
  usage tracking
  provider adapters

packages/db
  ragSource
  ragChunk
  ragQuery
  usageEvent
```

Vector storage options:

- Cloudflare Vectorize for a Cloudflare-native deployment.
- PostgreSQL with pgvector when the app already depends on Postgres.
- External vector databases such as Qdrant, Pinecone, or Supabase Vector for
  faster experimentation.

Recommended MVP:

- Ask this page: extract the current page, retrieve relevant chunks, and answer
  with source snippets.
- Save to memory: let authenticated users save pages or selections into a
  personal knowledge base.
- Query my memory: search across saved sources and generate grounded answers.
- Track usage: count tokens, embeddings, retrieval calls, and AI requests against
  user quotas.

### Browser Extension

- Chrome
- Edge
- Firefox
- Manifest V3
- WXT-based architecture
- Content scripts
- Background workers

### Shared Development Experience

- Shared TypeScript types
- Shared API clients
- Shared UI components
- End-to-end type safety

### Deployment

- Vercel
- Cloudflare
- One-command deployment
- Automated extension builds

## Example Projects

- YouTube AI Assistant
- Gmail AI Copilot
- LinkedIn AI Assistant
- Twitter/X AI Assistant
- Research Assistant Extension

## Target Audience

- Indie hackers
- SaaS founders
- AI product builders
- Browser extension developers

## Positioning

Not another SaaS boilerplate.

Not another Chrome extension starter.

A complete foundation for building AI-powered browser extension businesses.
