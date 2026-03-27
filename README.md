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
npm install
npx prisma generate
```

The generated Prisma client is committed in `generated/prisma` so the cPanel
deployment can run without platform-specific Prisma engines. The app now uses
the Prisma MySQL adapter at runtime, so `DATABASE_URL` should point to the
MySQL database on your hosting account.
