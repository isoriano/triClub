import { AuthEnvironment, SiteEnvironment } from '@tri-club/environment';

export const environment = {
  ...AuthEnvironment,
  ...SiteEnvironment,
  production: false,
  url: 'http://localhost:',
  sites: {
    dashboard: 3000,
    teams: 3001,
    settings: 3002,
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
