import { loadRemoteEntry } from '@angular-architects/module-federation';
import { environment } from './environments/environment';

Promise.all([
    loadRemoteEntry({type: 'module', remoteEntry: `${environment.url}${environment.sites.dashboard}/remoteEntry.js`}),
    loadRemoteEntry({type: 'module', remoteEntry: `${environment.url}${environment.sites.athlete}/remoteEntry.js`})
])
.catch(err => console.error('Error loading remote entries', err))
.then(() => import('./bootstrap'))
.catch(err => console.error(err));
