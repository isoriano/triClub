import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConfirmActionData } from '../../../models';

@Component({
  selector: 'isg-action-confirmation',
  templateUrl: './action-confirmation.component.html',
  // styleUrls: ['./action-confirmation.component.scss'],
  standalone: true,
  imports: [
    // MAT_DIALOG_DATA
  ]
})
export class ActionConfirmationComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ConfirmActionData,
    public dialogRef: MatDialogRef<ActionConfirmationComponent>
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onContinue(): void {
    this.dialogRef.close(true);
  }
}
