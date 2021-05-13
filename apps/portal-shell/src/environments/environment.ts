// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: 'http://localhost:',
  sites: {
    dashboard: 3000,
    athlete: 3001
  },
  firebaseConfig: {
    apiKey: "AIzaSyAtQDylxmyjfuMJbiP5PfHOYH9SNpuk50A",
    authDomain: "triclubmanagement.firebaseapp.com",
    databaseURL: "https://triclubmanagement.firebaseio.com",
    projectId: "triclubmanagement",
    storageBucket: "triclubmanagement.appspot.com",
    messagingSenderId: "106264222868",
    appId: "1:106264222868:web:d293a19240128a926ea881",
    measurementId: "G-Y0TB3HKMM1"
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
