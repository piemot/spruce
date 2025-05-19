import { defineMarkdocConfig, component } from "@astrojs/markdoc/config";

export default defineMarkdocConfig({
  variables: {
    environment: process.env.IS_PROD ? "prod" : "dev",
  },
  tags: {
    aside: {
      render: component("./src/components/Aside.astro"),
      attributes: {
        type: { type: String },
        title: { type: String },
      },
    },
  },
});
