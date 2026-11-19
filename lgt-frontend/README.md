# LGT Frontend

Next.js frontend for The Living God Tabernacle.

## Purpose

This workspace contains the public-facing landing page and frontend experience.
It is intentionally separate from the deployed backend in `lgt-api`.

## Development

Run the frontend locally from the repository root:

```bash
npm run start:frontend
```

Or from this workspace directly:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Build

```bash
npm run build
```

The build uses `--webpack` intentionally because `next-pwa` is currently wired
through the existing config. This preserves compatibility with the current setup
instead of changing the runtime architecture.

## Configuration

- `NEXT_PUBLIC_API_BASE_URL` should point to the deployed backend base URL.
- The landing page is written to fail gracefully if the API is unavailable.
- `next-pwa.d.ts` exists only to provide local type declarations for `next-pwa`.

## Important Boundaries

- Do not change the backend deployment entrypoint from this workspace.
- Do not move hosting paths or restructure UltraHost runtime directories without
  verifying the existing deployment flow first.
- Avoid committing generated PWA artifacts such as `public/sw.js` and
  `public/workbox-*.js`.

## Key Files

- `src/app/page.tsx`: landing page and API-backed fallback rendering
- `src/app/layout.tsx`: metadata and font setup
- `src/app/globals.css`: theme tokens and global presentation

## Deployment Note

The frontend is exported as static files and served by the existing Express /
Passenger application. To publish a frontend update, run `npm run build:frontend`
and `npm run sync:frontend` from the repository root. Commit the generated
`lgt-api/src/public/next-site` directory with the source changes. The server's
`npm run build` from `lgt-api` copies that package into `dist/next-site`
without needing Next.js installed on the server. The API remains available under
`/api`.

The dashboard is protected by the API's HTTP Basic authentication middleware.
Set `ADMIN_DASHBOARD_USERNAME` and `ADMIN_DASHBOARD_PASSWORD` in the cPanel Node
application environment before enabling dashboard access. The route returns
`503` while either setting is missing and prompts for credentials when configured.

After pulling a change, activate the existing Node environment, run
`npm run build` from `lgt-api`, run `npm run verify:views`, and restart Passenger
with the hosting account's configured restart file.
