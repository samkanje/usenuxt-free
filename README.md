# UseNuxt Starter

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

Copy .env and update the values to match your environment (especially the NUXT_DATABASE_URL variable)

```bash
cp .env.example .env
```

If you don't alread have a Postgres database, spin one up quickly with docker.

```bash
docker run --name postgres -e POSTGRES_PASSWORD=postgres -d postgres
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

Changes to the database schema can be pushed directly to dev database
```bash
# npm
npm run db:push

# pnpm
pnpm run db:push

# yarn
yarn run db:push

# bun
bun run db:push
```

To commit the schema changes for them to be applied automatically in production, generate a migration.
```bash
# npm
npm run db:gen

# pnpm
pnpm run db:gen

# yarn
yarn run db:gen

# bun
bun run run db:gen
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Run production server:

```bash
#node
node .output/server/index.mjs

# pm2
pm2 .output/server/index.mjs
```
