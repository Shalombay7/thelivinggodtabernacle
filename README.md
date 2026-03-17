# LGT API

Backend API for The Living God Tabernacle.

## Requirements

- Node.js 20+
- PostgreSQL (optional unless you use Prisma-backed features)

## Setup

```bash
npm install
```

Create `.env` (optional for now):

```bash
PORT=3000
DATABASE_URL=postgresql://user:pass@localhost:5432/lgt
```

## Run

```bash
npm run start:dev
```

## Endpoints

- `GET /api` basic hello response
- `GET /api/health` health check
- `GET /docs` Swagger UI

## Prisma

```bash
npx prisma generate
```