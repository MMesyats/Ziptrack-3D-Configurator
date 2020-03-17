import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "rollup-plugin-replace";
import html from "rollup-plugin-generate-html-template";
import scss from "rollup-plugin-scss";
import json from "@rollup/plugin-json";
import svg from "rollup-plugin-svg";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";

export default {
  input: "./src/index.jsx",
  output: {
    file: "./dist/public/main.js",
    format: "umd"
  },
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    babel({ exclude: "./node_modules/**" }),
    resolve({
      extensions: [".js", ".jsx", ".json"],
      snext: true,
      preferBuiltins: true,
      browser: true,
      dedube: ["react", "react-dom"]
    }),
    commonjs({
      include: "node_modules/**",
      namedExports: {
        "react-three-fiber/node_modules/scheduler": [
          "unstable_runWithPriority",
          "unstable_IdlePriority",
          "unstable_now",
          "unstable_scheduleCallback",
          "unstable_cancelCallback"
        ],
        debounce: ["debounce"],
        "react-dom": ["createPortal"],
        react: [
          "createContext",
          "createElement",
          "useState",
          "useRef",
          "useCallback",
          "useLayoutEffect",
          "useEffect",
          "useContext",
          "useReducer",
          "useMemo"
        ]
      }
    }),
    scss(),
    html({ template: "public/index.html" }),
    json(),
    svg(),
    postcss(),
    terser()
  ]
};
