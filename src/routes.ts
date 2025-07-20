import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // * matches all URLs, the ? makes it optional so it will match / as well
  index("./routes/home.tsx"),
  route("/about", "./routes/about.tsx"),
] satisfies RouteConfig;
