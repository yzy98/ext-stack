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
- Tooling: pnpm workspace, Turborepo, TypeScript, Ultracite, and Biome

Planned:

- packages/db: Drizzle ORM + PostgreSQL
- packages/auth: Better Auth
- packages/billing: Stripe Billing
- packages/ai: AI provider integrations and usage tracking

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
