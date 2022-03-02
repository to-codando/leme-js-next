const esbuild = require("esbuild");

const ENV = process.env.NODE_ENV;

if (ENV === "development") {
  esbuild
    .build({
      entryPoints: ["src/main.js"],
      outdir: "dist",
      bundle: true,
	  treeShaking:true,
      keepNames: true,
      sourcemap: true,
      minify: false,
      splitting: true,
      format: "esm",
      target: ["esnext"],
      loader: {
        ".png": "dataurl",
        ".svg": "text",
      },
    })
    .then(() => {
      return `
        ${console.log("==========================================")}
        ${console.log("========Environment: development==========")}
        ${console.log("==========================================")}
      `;
    })
    .catch(() => process.exit(1));
} else if (ENV === "production") {
  esbuild
    .build({
      entryPoints: ["src/main.js"],
      outdir: "dist",
      bundle: true,
	  treeShaking:true,
      keepNames: true,
      minify: true,
      splitting: true,
      format: "esm",
      target: ["chrome51", "firefox58", "edge18", "safari11"],
      loader: {
        ".png": "dataurl",
        ".svg": "text",
      },
    })
    .then(() => {
      return `
        console.log("=============================================");
        console.log("==========Environment: production============");
        console.log("=============================================");
      `;
    })
    .catch(() => process.exit(1));
}