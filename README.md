This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Local development

### Install supabase CLI

```text
brew install supabase/tap/supabase
```

### Initialize supabase services

```text
supabase init
```

Logs:

```text
Generate VS Code settings for Deno? [y/N] n
Finished supabase init.
```

At this point we have:

- supabase services Initialized for development purposes
- a supabase folder at the root of the project, containing some files.

### Start supabase services

```text
supabase start
```

Logs:

```text
Seeding data supabase/seed.sql...
Started supabase local development setup.

         API URL: http://127.0.0.1:54321
     GraphQL URL: http://127.0.0.1:54321/graphql/v1
          DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
      Studio URL: http://127.0.0.1:54323
    Inbucket URL: http://127.0.0.1:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
```

At this point we have supabase services started and running for development purposes. Supabase dashboard will be available [here](http://localhost:54323)

## Migrations

### Create a migration using CLI

This will create a migration file under the supabase/migrations folder with the format <timestamp>\_init-schema.sql

```text
supabase migration new init-schema
```

Logs:

```text
Created new migration at supabase/migrations/20240224165446_init-schema.sql
```

### Apply locally the migrations

```text
supabase migration up
```

Logs:

```text
Connecting to local database...
Applying migration 20240224165446_init-schema.sql...
Local database is up to date.
```

### Update types locally using CLI

```text
supabase gen types typescript --local > types.gen.ts
```

This will update the file: types.gen.ts  
Always do it before after creating a new migrations and expose the new types created if needed.

## Tailwind

If tailwind intellisense do not work, in my case i guess its due to the fact that i have  
at the root of the project **_tailwind.config.ts_** instead of **_tailwind.config.js_**  
So to fix it :

- Delete postcss.config.js and tailwind.config.ts files (at the root of the project)
- Follow Next.js [documentation](https://nextjs.org/docs/app/building-your-application/styling/tailwind-css#configuring-tailwind)

## Tips

### Expose types globally in the project

Create a file called <global.d.ts> at the root of the project.

```typescript
import type { Database } from "./types.gen";

declare global {
  type users = Database["public"]["Tables"]["users"]["Row"];
}
```
