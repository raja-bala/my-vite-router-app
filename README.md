# React + TypeScript + Vite + React Router V7 Framework setup

1. Install Vite

```shell
npm create vite@latest ./
```

2. Install React Router

```shell
npm install react-router
```

3. Install the React Router Vite plugin

```shell
npm install -D @react-router/dev
```

4. Install a runtime adapter - As we are using Node as your runtime.

```shell
npm install @react-router/node
```

5. Change the React plugin to React Router in Vite.config.js

```ts
-import react from '@vitejs/plugin-react'
+import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";


export default defineConfig({
  plugins: [
-    react()
+    reactRouter()
  ],
});
```

6. Add the React Router config

- create a `react-router.config.ts` file in the root directory
- add the following code to it

```ts
import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src",
  ssr: false,
} satisfies Config;
```

7. Add the Root entry point

- In a typical Vite app, the `index.html` file is the entry point for bundling. The React Router Vite plugin moves the entry point to a root.tsx file so you can use React to render the shell of your app instead of static HTML, and eventually upgrade to Server Rendering if you want.

- Move your existing `index.html` to `src/root.tsx`

- For example, if your current index.html looks like this:

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- Delete the `index.html` and create a new `src/root.tsx` file

###src/root.tsx

```tsx
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My App</title>
        <Meta />
        <Links />
      </head>
      <body>
        <{children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}
```

8. Add client entry module

- In the typical Vite app the `index.html` file points to `src/main.tsx` as the client entry point. React Router uses a file named `src/entry.client.tsx` as the client entry point` instead.

- If your current `src/main.tsx` looks like this:

### src/main.tsx

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- Rename the `src/main.tsx` file to `src/entry.client.tsx` file. And update its contents to this:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
import "./index.css";

ReactDOM.hydrateRoot(
  document,
  <React.StrictMode>
    <HydratedRouter />
  </React.StrictMode>
);
```

- Use `hydrateRoot` instead of `createRoot`
- Render a `<HydratedRouter>` instead of your `<App/>` component
- Note: we stopped rendering the `<App/>` component. We'll bring it back in a later step, but first we want to get the app to boot with the new entry point.

9. Usage of `root.tsx` and `entry.client.tsx`

- Between root.tsx and entry.client.tsx, you may want to shuffle some stuff around between them.

In general:

- 1. Use `root.tsx contains any rendering things like context providers, layouts, styles, etc.
- 2. entry.client.tsx should be as minimal as possible
- 3. Remember to not try to render your existing <App/> component yet, we'll do that in a later step

- Note that your root.tsx file will be statically generated and served as the entry point of your app, so just that module will need to be compatible with server rendering. This is where most of your trouble will come.

10. Setting up our Routes

- The React Router Vite plugin uses a `routes.ts` file to configure your routes. For now we'll add a simple catchall route to get things going.
- create a `src/routes.ts` file and `src/catchall.tsx` file

### src/routes.ts

```ts
import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  // * matches all URLs, the ? makes it optional so it will match / as well
  route("*?", "catchall.tsx"),
] satisfies RouteConfig;
```

### src/catchall.tsx

Replace this with our original `App` component, but for now we'll just render something simple to make sure we can boot the app.

```tsx
import App from "./App";

export default function Component() {
  return <App />;
}
```

and in the `src/App.tsx` file, add the div with id `root` by replacing the existing fragment root, so the existing design wont be broken.

### src/App.tsx

````tsx
- <>
+ <div id="root">
- </>
- </div>
```tsx

````
