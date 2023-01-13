import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';

import { NotificationComponent } from '@isg/ui';

import { NotificationService } from '../services';

@Component({
  selector: 'isg-notification-container',
  template: `<isg-notification
    *ngIf="notification$ | async as notification"
    [title]="notification.title"
    [content]="notification.content"
    [color]="notification.color"
    [pHoritzontal]="notification.position.horitzontal"
    [pVertical]="notification.position.vertical"
    (clear)="onClear()"
  ></isg-notification>`,
  standalone: true,
  imports: [AsyncPipe, NgIf, NotificationComponent]
})
export class NotificationContainerComponent {
  private notificationService = inject(NotificationService);

  notification$ = this.notificationService.notification$;

  onClear(): void {
    this.notificationService.clear();
  }
}
