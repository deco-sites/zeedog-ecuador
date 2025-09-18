import { defineConfig } from "$fresh/server.ts";
import { plugins } from "deco/plugins/deco.ts";
import { useLanguage } from "$sdk/hooks/useLanguage.ts";
import manifest from "./manifest.gen.ts";

export default defineConfig({
  plugins: [
    ...plugins({ manifest }),
  ],
  render: (ctx, render) => {
    const url = new URL(ctx.url);
    const language = useLanguage(url);
    // Set the language in the context for use in the application
    ctx.lang = language;
    render();
  },
});
