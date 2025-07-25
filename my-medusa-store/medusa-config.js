// my-medusa-store/medusa-config.js
// This JS shim ensures Medusa’s CLI sees your custom admin.outDir
const path = require("path")
const tsConfig = require("./medusa-config.ts").default

module.exports = {
  ...tsConfig,
  admin: {
    // override where the built Admin UI is served from
    outDir: path.join(__dirname, "public", "admin"),
    ...(tsConfig.admin || {}),
  },
}
