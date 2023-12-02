import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import copy from "rollup-plugin-copy";
import compression from "vite-plugin-compression";
import { reactScopedCssPlugin } from "rollup-plugin-react-scoped-css";
import { visualizer } from "rollup-plugin-visualizer";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import external from "./external";
import postcssNesting from "postcss-nesting";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [postcssNesting],
    },
  },
  build: {
    lib: {
      // 入口文件将包含可以由你的包的用户导入的导出：
      entry: resolve(__dirname, "src/index.tsx"),
      name: "ReactComponents",
      fileName: "index",
      formats: ["umd", "cjs", "es"],
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.tsx"),
      },
      // 确保外部化处理那些你不想打包进库的依赖
      external: Object.keys(external),
      treeshake: true,
      output: [
        {
          //打包格式
          format: "es",
          //打包后文件名
          entryFileNames: "[name].mjs",
          //让打包目录和我们目录对应
          preserveModules: true,
          exports: "named",
          //配置打包根目录
          dir: "./build/es",
        },
        {
          format: "umd",
          name: "bestComps",
          globals: external,
          inlineDynamicImports: true,
          dir: "./build/dist",
        },
        {
          //打包格式
          format: "cjs",
          //打包后文件名
          entryFileNames: "[name].js",
          //让打包目录和我们目录对应
          preserveModules: true,
          exports: "named",
          //配置打包根目录
          dir: "./build/lib",
        },
      ],
    },
  sourcemap: true
  },
  plugins: [
    visualizer(),
    react(),
    dts({
      entryRoot: "./src",
      outputDir: ["./build/es/src", "./build/lib/src"],
      //指定使用的tsconfig.json为我们整个项目根目录下,如果不配置,你也可以在components下新建tsconfig.json
      tsConfigFilePath: "./tsconfig.json",
    }),
    compression({
      algorithm: "gzip",
      ext: ".gz",
    }),
    reactScopedCssPlugin({
      exclude:['./src/style']
    }),
    copy({
      targets: [
        { src: "package.json", dest: "build" },
        { src: "tsconfig.json", dest: "build" },
        { src: "README.md", dest: "build" },
      ],
      hook: "writeBundle",
    }),
  ],
});
