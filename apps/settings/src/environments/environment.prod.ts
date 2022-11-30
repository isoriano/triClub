import { AuthProdEnvironment, SiteEnvironment } from '@tri-club/environment';

export const environment = {
  production: true,
  ...AuthProdEnvironment,
  ...SiteEnvironment
};
