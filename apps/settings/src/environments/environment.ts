import { AuthEnvironment, SiteEnvironment } from '@tri-club/environment';

export const environment = {
  production: false,
  ...AuthEnvironment,
  ...SiteEnvironment
};
