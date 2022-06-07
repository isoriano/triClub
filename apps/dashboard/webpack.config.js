const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, '../../tsconfig.base.json'), [
  '@tri-club/authentication',
]);

module.exports = {
  mode: 'development',
  output: {
    uniqueName: 'dashboard',
    publicPath: 'auto'
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      library: { type: 'module' },
      name: 'dashboard',
      filename: 'remoteEntry.js',
      exposes: {
        './Module': './apps/dashboard/src/app/feature/dashboard.module.ts',
      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: false },
        '@angular/common': { singleton: true, strictVersion: false },
        '@angular/router': { singleton: true, strictVersion: false },
        '@angular/fire/compat': { singleton: true, strictVersion: true },
        '@ngx-translate/core': { singleton: true, strictVersion: true },
        '@ngrx/store': { singleton: true, strictVersion: false },
        ...sharedMappings.getDescriptors(),
      },
    }),
    sharedMappings.getPlugin(),
  ],
};
