import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
  // * matches all URLs, the ? makes it optional so it will match / as well
  index("./routes/home.tsx"),
] satisfies RouteConfig;
