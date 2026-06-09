import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { defineConfig } from "wxt";

export default defineConfig({
  srcDir: "src",
  modules: ["@wxt-dev/module-react"],
  react: {
    vitePluginsBefore: [
      tanstackRouter({
        target: "react",
        autoCodeSplitting: true,
      }),
    ],
  },
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  manifest: () => ({
    host_permissions: [`${import.meta.env.WXT_API_URL}/*`],
  }),
});
