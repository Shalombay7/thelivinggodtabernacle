# LGT API

Backend API for The Living God Tabernacle.

## Requirements

- Node.js 20+
- MySQL (optional unless you use Prisma-backed features)

## Setup

```bash
npm install
```

Create `.env` (optional for now):

```bash
PORT=3000
DATABASE_URL=mysql://user:pass@localhost:3306/lgt
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

The generated Prisma client is committed in `generated/prisma`, so production
deployments on shared hosting do not need to run `prisma generate` on the
server unless the schema changes.
