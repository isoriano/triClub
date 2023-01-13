const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, '../../tsconfig.base.json'), [
  '@isg/files',
  '@isg/notification',
  '@tri-club/user'
]);

module.exports = {
  output: {
    uniqueName: 'settings',
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
      name: 'settings',
      filename: 'remoteEntry.js',
      exposes: {
        './routes': './apps/settings/src/app/settings.routes.ts',
      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: false },
        '@angular/common': { singleton: true, strictVersion: false },
        '@angular/router': { singleton: true, strictVersion: false },
        '@angular/common/http': { singleton: true, strictVersion: false },
        '@ngrx/store': { singleton: true, strictVersion: false },
        '@ngrx/effects': { singleton: true, strictVersion: false },
        '@ngx-translate/core': { singleton: true, strictVersion: false },
        '@auth0/auth0-angular': { singleton: true, strictVersion: false },
        ...sharedMappings.getDescriptors(),
      },
    }),
    sharedMappings.getPlugin(),
  ],
};
