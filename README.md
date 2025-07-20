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
        {children}
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
