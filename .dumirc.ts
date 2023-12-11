import { defineConfig } from "dumi";

export default defineConfig({
  outputPath: "docs-dist",
  base: "/react-demo/",
  publicPath: "/react-demo/",
  themeConfig: {
    name: "react-demo",
    logo: "https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png",
    socialLinks: {
      github: "https://github.com/For-lizhuo/react-demo",
    },
  },
  resolve: {
    atomDirs: [
      {
        type: "demo",
        dir: "src/demo",
      },
    ],
  },
  favicons: ["https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png"],
});
