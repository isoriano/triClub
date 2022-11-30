import { AuthProdEnvironment, SiteEnvironment } from '@tri-club/environment';

export const environment = {
  ...AuthProdEnvironment,
  ...SiteEnvironment,
  production: true,
  url: 'https://sambori.onrender.com/',
  sites: {
    dashboard: 'dashboard',
    athlete: 'athlete',
    settings: 'settings'
  }
};
