import { ApplicationConfig } from '@angular/core';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TEAMS_ROUTES } from './teams.routes';
export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(RouterModule.forRoot(TEAMS_ROUTES))]
};
