# Next.js Project with Tailwind CSS and TypeScript

A Next.js application built with App Router, Tailwind CSS, and TypeScript.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) with App Router support
- **Type Checking**: [TypeScript](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Database**: DrizzleORM (compatible with PostgreSQL, SQLite, MySQL)
- **Offline Development**: PGlite
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Environment Variables**: T3 Env (type-safe)
- **Forms**: React Hook Form
- **Validation**: Zod
- **Linting**: ESLint (with Biome configuration)
- **Code Formatting**: Prettier
- **Testing**: Vitest (unit), Playwright (E2E)
- **Logging**: Pino.js

## Requirements

- Node.js 20+ and npm

## Getting Started

Install dependencies:

```shell
npm install
```

Run the development server:

```shell
npm run dev
```

Open http://localhost:3000 to see the application.

## Project Structure

```shell
.
├── README.md                       # README file
├── .github                         # GitHub folder
├── .husky                          # Husky configuration
├── .storybook                      # Storybook folder
├── .vscode                         # VSCode configuration
├── migrations                      # Database migrations
├── public                          # Public assets folder
├── src
│   ├── app                         # Next JS App (App Router)
│   ├── components                  # React components
│   ├── libs                        # 3rd party libraries configuration
│   ├── locales                     # Locales folder (i18n messages)
│   ├── models                      # Database models
│   ├── styles                      # Styles folder
│   ├── templates                   # Templates folder
│   ├── types                       # Type definitions
│   ├── utils                       # Utilities folder
│   └── validations                 # Validation schemas
├── tests
│   ├── e2e                         # E2E tests
│   └── integration                 # Integration tests
├── tailwind.config.js              # Tailwind CSS configuration
└── tsconfig.json                   # TypeScript configuration
```

## Database

### Schema Management

Database schema is defined in `./src/models/Schema.ts` using Drizzle ORM.

To modify the schema:

1. Update the schema file
2. Generate a migration:
   ```shell
   npm run db:generate
   ```

Migrations are automatically applied during the next database interaction.

### Database Studio

Explore your database using Drizzle Studio:

```shell
npm run db:studio
```

Then open https://local.drizzle.studio

## Testing

### Unit Tests

Run unit tests with Vitest:

```shell
npm run test
```

### E2E Testing

Run end-to-end tests with Playwright:

```shell
npx playwright install # First time only
npm run test:e2e
```

## Build & Production

Generate a production build:

```shell
npm run build
```

Test the production build:

```shell
npm run start
```

Database migrations are automatically executed during the build process if DATABASE_URL is defined.

## Development Commands

### Bundle Analysis

Analyze JavaScript bundle sizes:

```shell
npm run build-stats
```

## Code Standards

The project follows:
- Conventional Commits specification
- Biome linting rules
- TypeScript strict mode

Use the commit helper:

```shell
npm run commit
```

## Configuration Files

Key configuration files to customize:
- `src/utils/AppConfig.ts`: Application configuration
- `src/templates/BaseTemplate.tsx`: Default theme
- `next.config.ts`: Next.js configuration
- `.env`: Environment variables

## License

Licensed under the MIT License, Copyright © 2025

See [LICENSE](LICENSE) for more information.
# Force rebuild Sat  5 Jul 2025 14:22:03 AEST
