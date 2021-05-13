const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.base.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "portal-shell",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {},
      shared: {
        // Keep strictVersion as false until firebase is updated to angular v12
        "@angular/core": { singleton: true, strictVersion: false },
        "@angular/common": { singleton: true, strictVersion: false },
        "@angular/router": { singleton: true, strictVersion: false },
        "@angular/fire": { singleton: true, strictVersion: true },
        "@ngx-translate/core": { singleton: true, strictVersion: true },
        "@ngrx/store": { singleton: true, strictVersion: true },
        ...sharedMappings.getDescriptors()
      }

    }),
    sharedMappings.getPlugin(),
  ],
};
