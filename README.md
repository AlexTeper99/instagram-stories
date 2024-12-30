## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `story-manager`: a [Next.js](https://nextjs.org/) app
- `story-viewer`: another [Next.js](https://nextjs.org/) app
- `packages/ui`: a sub NextJS repository/library. This contain shared components and functions for both `story-manager` and `story-viewer` applications (need to rename the package)
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Enviroment variables

Fill the variables in the .env.example using your Supabase account.

### Setting up tables

```
npx drizzle-kit push
```

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

To run each app in your monorepo, you can use the pnpm command from the root of the monorepo. Here are the commands to run each app:

#### Run the 'story-manager' Next.js app

```
pnpm --filter story-manager dev
```

#### Run the 'story-viewer' Next.js app

```
pnpm --filter story-viewer dev
```

#### Deployments

https://instagram-stories-story-viewer.vercel.app/

https://instagram-stories-story-manager.vercel.app/
