import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Settings } from '../models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notification$ = new Subject<Settings>();

  public open(settings: Settings): void {
    this.notification$.next(settings);
  }

  public clear(): void {
    this.notification$.next(null);
  }
}
