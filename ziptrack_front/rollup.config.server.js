import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import { prefetchStatic } from "./plugins/rollup-fetch-static/main";

export default {
  input: "src/server/server.dev.js",
  output: {
    file: "dist/server.js",
    format: "cjs"
  },
  external: ["express", "graphql", "express-graphql", "cors"],
  plugins: [
    babel({
      exclude: "node_modules/**"
    }),
    resolve({ preferBuiltins: true }),
    prefetchStatic({
      endpoint: "http://localhost:8000/api",
      apiNames: [
        "pelmets",
        "materials",
        "mountings",
        "product_types",
        "mechanics/options",
        "mechanics",
        "colors",
        "bws"
      ],
      staticDir: "dist/public/static"
    })
  ]
};
