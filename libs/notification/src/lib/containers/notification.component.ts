import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';

import { NotificationComponent } from '@isg/ui';

import { NotificationService } from '../services';

@Component({
  selector: 'isg-notification-container',
  templateUrl: './notification.component.html',
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
