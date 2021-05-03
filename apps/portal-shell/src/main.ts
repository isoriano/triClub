import { loadRemoteEntry } from '@angular-architects/module-federation';
import { environment } from './environments/environment';

Promise.all([
    loadRemoteEntry(`${environment.url}${environment.sites.dashboard}/remoteEntry.js`, 'dashboard'),
    loadRemoteEntry(`${environment.url}${environment.sites.athlete}/remoteEntry.js`, 'athlete')
])
.catch(err => console.error('Error loading remote entries', err))
.then(() => import('./bootstrap'))
.catch(err => console.error(err));
