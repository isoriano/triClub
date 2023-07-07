import { ApplicationConfig } from '@angular/core';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SETTINGS_ROUTES } from './settings.routes';
export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(RouterModule.forRoot(SETTINGS_ROUTES, {}))
    // provideStore(),
    // provideEffects()
  ]
};
