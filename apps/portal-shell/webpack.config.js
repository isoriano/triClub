const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, '../../tsconfig.base.json'), [
  // '@tri-club/authentication',
]);

module.exports = {
  output: {
    uniqueName: 'portal-shell',
    publicPath: 'auto'
  },
  optimization: {
    runtimeChunk: false
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
      library: { type: "module" },
      remotes: {},
      shared: {
        // Keep strictVersion as false until firebase is updated to angular v12
        "@angular/core": { singleton: true, strictVersion: false }, 
        "@angular/common": { singleton: true, strictVersion: false }, 
        "@angular/router": { singleton: true, strictVersion: false },
        '@angular/fire/compat': { singleton: true, strictVersion: false },
        '@ngx-translate/core': { singleton: true, strictVersion: false },
        '@ngrx/store': { singleton: true, strictVersion: false },
        'firebase': { singleton: true, strictVersion: false },
        'rxjs': { singleton: true, strictVersion: false },
        'rxjs/operators': { singleton: true, strictVersion: false },
        ...sharedMappings.getDescriptors(),
      },
    }),
    sharedMappings.getPlugin(),
  ],
};
