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
