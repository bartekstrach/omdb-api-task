# 🎦 omdb-api-task

## 🚀 How to run it?

1. Install pnpm - https://pnpm.io/installation
2. Run `pnpm install` to install dependencies
3. Create `.env` file based on `.env.example` content
4. Replace `<OMDB_API_KEY>` with your OMDb API key
5. Run `pnpm dev` to run the application

### Scripts
- `dev` - start the app for development
- `build` – Create the final production version of the app
- `format:check` – Check if the code is nicely formatted
- `format:fix` – Automatically clean up the code formatting
- `lint` – Check the code for problems
- `lint:fix` – Automatically fix code problems
- `preview` – Preview the production build locally
- `test` – Run tests
- `test:ui` – Run tests with a visual interface
- `test:run` – Run all tests once
- `test:coverage` – Run tests and show which parts of the code are covered

## 📦 Dependencies

### Development
- React
- TypeScript
- React Router

### UI
- CSS - [Tailwind](https://tailwindcss.com/)
- icons - [Heroicons](https://heroicons.dev)

### Testing
- Vitest
- React Testing Library

### Linting
- ESLint
- Prettier

### Accessibility
- React Axe

## ➡️ Next steps - self-review

### App
- enable forgotten `StrictMode` 🤦
- configure Vite development mode propertly
- revisit `useEffect` (see if could be simplified/combined, especially "on mount" part)
- revisit `useActionState` (check if used properly)
- sanitize all inputs
- validate all query params (and make sure it's done in one place)
- revisit error handling (fallback components, logging?)

### Components & Responsiveness
- scale image (esp. on mobile devices)
- resize and center `<Message>` component
- create a fancy pagination component (add at least choosing a page number functionality)
- add error messages for search inputs (title, year, type)
- fix search inputs widths
- revisit styles to simplify Tailwind usage

### Indexed DB
- handle potential race conditions (what if two movies are added at the same time)
- create a util to query Indexed DB instead of fetching all records and filtering
- use the query util created above for pagination in favorites
- sync Indexed DB and React state (what if Indexed DB is unavailable or full?)

### Testing
- add more tests (test functions and components)
- add `axe-core` with React Testing Library to test a11y
- resolve issue with `react-axe` and Tailwind (incorrect converting colors)
- add type mocks

### Codebase
- move and create abstraction for `src/utils/favorites.ts`

## ℹ️ More info

More details [here](./docs/README.md).
