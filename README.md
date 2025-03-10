# Sunlo.app

## A react SPA and a Supabase project

## Local Setup

### Supabase back-end

- Install [Docker Desktop](https://docs.docker.com/desktop/)
- Install [Supabase cli](https://supabase.com/docs/guides/local-development/cli/getting-started)
- `supabase start`
- `supabase db reset`

### React front-end

- `pnpm install`
- `cp .env.example .env.local`
- populate the environment variables in .env.local with the outputs from `supabase start`
- `pnpm dev`

### Mobile Apps with Tauri

    - install Tauri [pre-requisites](https://v2.tauri.app/start/prerequisites/)
    - `pnpm tauri android init` && `pnpm tauri android dev`
    - `pnpm tauri ios init` && `pnpm tauri ios dev`

To make the Android app work, you will probably have to run:

    - `adb reverse tcp:5173 tcp:5173`
    - `adb reverse tcp:54321 tcp:54321`

## Database management

### Migrations

- Use the local admin at [http://localhost://54323](http://localhost://54323) to make changes to the DB
- `pnpm run migrate` to create migrations from your local changes
- `pnpm run types` to regenerate typescript types

The migrations should run when the main branch deploys. Or you can `supabase db push` to make it so.

[Read more about working with Supabase migrations.](https://supabase.com/docs/guides/local-development/cli/getting-started)

### Working on the Seeds

To work on the seeds, get your local database into the shape you want and then:

- `supabase db dump --local --data-only > supabase/seed.sql`

If you want to start over from the production database, since we're not launched yet, it's okay
to dump the production database and use the interface to remove all the users except the sample
user, along with their profiles. (Everything else will cascade and delete, at least, at the time
of this writing.)

- dump the db: `supabase db dump --data-only > supabase/seed.sql`
- then run the db locally and delete the users and profiles through the admin
- Then when the local database is ready to be seed-ified, use the local data dump listed above

### FAQ

- If you want to blow away migrations to recreate them you can directly modify the table `supabase_migrations.schema_migration`
- Write migrations by hand: `supabase migration new some_migration_name_here`
- Generate a migration from the local database: `supabase db diff -f some_migration_name_here`

When your local supabase starts up it will spit out the environment variables you need for your environment file. You can either change your values in `.env.local` or add another file `.env.development.local` which overrides its values.

### Using Tauri for Native Apps

The app is set to deploy as static HTML outputs, so it should generally work
with the Tauri system for compiling to WASM/Rust. e.g. `pnpm tauri dev`,
`pnpm tauri android dev`, `pnpm tauri ios dev`, and so on.

Remember to start the Android Studio and activate a Virtual Device from the Device Manager. Check `adb devices` to make sure something is connected.
