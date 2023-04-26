import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

export default defineConfig({
  base: "point-admin", // 公共基础路径
  plugins: [react()],
  // 设置路径别名
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    assetsInlineLimit: 4096, // 图片转 base64 编码的阈值
    terserOptions: {
      //打包后移除console和注释
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  // 定义全局的less变量
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "${path.resolve(
          __dirname,
          "src/style/theme.less"
        )}";`,
        javascriptEnabled: true,
      },
    },
  },
  // 配置跨域反向代理
  server: {
    proxy: {
      "/api": {
        target: "http://XXX",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
