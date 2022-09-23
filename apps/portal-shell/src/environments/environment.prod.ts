import { AuthProdEnvironment } from '@tri-club/environment';

export const environment = {
  ...AuthProdEnvironment,
  production: true,
  url: 'https://sambori.onrender.com/',
  sites: {
    dashboard: 'dashboard',
    athlete: 'athlete'
  }
};
