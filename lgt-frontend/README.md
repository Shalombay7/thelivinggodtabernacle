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
Passenger application. Install this workspace's dependencies with
`npm install --include=dev --workspaces=false` from `lgt-frontend`. Then
`npm run build` from `lgt-api` builds the API, exports this workspace, and copies the export to
`lgt-api/dist/public/next-site`. The API remains available under `/api`.

After pulling a change, activate the existing Node environment, run
`npm run build` from `lgt-api`, run `npm run verify:views`, and restart Passenger
with the hosting account's configured restart file.
