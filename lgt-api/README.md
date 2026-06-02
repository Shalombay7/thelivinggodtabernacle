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

- `GET /` public status response
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

## Deployment Note

If your host starts the app from the repository root, use the root `app.js`
entrypoint. It forwards startup into `lgt-api/app.js`, which boots the Nest
application from this subdirectory.

## Maintenance Boundary

The currently deployed backend path is:

`root app.js` -> `lgt-api/app.js` -> `lgt-api/dist/main.js`

Preserve that path unless a deployment migration is planned and tested.

Some files under `src/prisma` are not part of the active runtime path yet.
They should be treated as unfinished feature work rather than production
modules. Do not wire them into `AppModule` or the production build until their
types, dependencies, and Prisma model usage are completed.
