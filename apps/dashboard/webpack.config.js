const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.base.json'),
  [/* mapped paths to share */]);

module.exports = {
  mode: 'development',
  output: {
    uniqueName: "dashboard",
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

        name: "dashboard",
        filename: "remoteEntry.js",
        exposes: {
            './Module': './apps/dashboard/src/app/feature/dashboard.module.ts',
        },
        shared: {
          "@angular/core": { singleton: true, strictVersion: false },
          "@angular/common": { singleton: true, strictVersion: false },
          "@angular/router": { singleton: true, strictVersion: false },
          "@angular/fire": { singleton: true, strictVersion: true },
          "@ngx-translate/core": { singleton: true, strictVersion: true },

          ...sharedMappings.getDescriptors()
        }

    }),
    sharedMappings.getPlugin(),
  ],
};
