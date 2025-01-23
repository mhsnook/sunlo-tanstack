# Sunlo.app

## A react SPA and a Supabase project

## Running the SPA

- `pnpm install`
- `cp .env.example .env.local` and then enter database supabase URL and public key
- `pnpm dev`

## Running the back-end

Usually in development we are developing the UI against the production database.
But when the current work requires breaking changes and we need to modify the database in tandem with the code branch,
we'll run Supabase locally with Docker, sync our local copy using the Supabase CLI, and use migrations for any changes.

- Install [Docker Desktop](https://docs.docker.com/desktop/)
- `supabase start`
- `supabase db reset` to run migrations and seeds

The first time you run this it will download and build all the docker images for postgres, the postgrest server, the auth server, storage server, etc. After that, it will just start.

When you make changes to your local database and want to commit changes:

- `pnpm run migrate` to create migrations
- `pnpm run types` to regenerate typescript types

The migrations should run when the main branch deploys. Or you can `supabase db push` to make it so.

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

### Uncommitted

The state of the database isn't commited to the repo yet. There are some Supabase types but they are outdated and now incomplete. But I'm not working with other devs and for this part of development I don't even need to use a local copy of the database, so I haven't bothered to figure out and start using Supabase's particular flavour of managing migrations. (By the time we get to production, we may be using something else anyway 🤷)

As a result, you should request access to the Supabase project in order to see what fields and types we have there. Here is the general outline of the database:

- `user_profile`, `user_deck`, `user_card`, `user_card_review` -- these are the user data tables that are owned by a specific user. They all have a `uid` column which is their auth user's ID, and RLS protects from anyone else reading or writing to these records.
- `language`, `phrase`, `phrase_translation`, `phrase_relation` -- this is the public content of the app. Unauthenticated visitors should be able to view and browse this information, and it should be available as a public API if anyone wants it. Logged-in users can write to these tables (except `language`, for some reason 🤔). At some point we may introduce moderation and things will change drastically but for now this is all open.
  - These tables shouldn't contain any PII but they do contain an `added_by` reference to a uid, which is perhaps a leak to address (more on this below).
- `language_plus`, `user_deck_plus`, `user_card_review_plus` -- these `*_plus` relations are views meant for the client application to more easily fetch collated and sorted data from the database. It's useful to know how many people are learning a certain language, or which of my decks I reviewed most recently, and this is really the kind of logic that databases and query languages are better at then Javascript, so we put the logic in the database (preferring this over fatter fetcher functions with `supabase-js`'s extremely specific select/query language).
  - The views that start with `user_` are all using the RLS of the requester, while the `language_plus` view uses full permissions, accessing the (private) table `user_decks` to see how many users are using a deck, but not exposing anything else.

This naming convention of using `*_plus` views may want to change in the future. At the moment these are pretty 1-to-1 metadata enhancements so it's working fine but it may make sense to switch _all_ data access over to a separate schema or to separate things into public data and user data more explicitly, etc.

### Using Tauri for Native Apps

The app is set to deploy as static HTML outputs, so it should generally work
with the Tauri system for compiling to WASM/Rust. e.g. `pnpm tauri dev`,
`pnpm tauri android dev`, `pnpm tauri ios dev`, and so on.

Remember to start the Android Studio and activate a Virtual Device from the Device Manager. Check `adb devices` to make sure something is connected.
