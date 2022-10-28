import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { forkJoin, Observable } from 'rxjs';

import { ButtonComponent } from '@isg/ui';

import { UploadService } from '../../services';

@Component({
  standalone: true,
  selector: 'isg-uploader',
  templateUrl: 'uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
  imports: [CommonModule, HttpClientModule, MatButtonModule, MatDialogModule, MatIconModule, MatListModule, MatProgressBarModule, ButtonComponent]
})
export class UploaderComponent {
  @ViewChild('file') file: ElementRef;

  @Input() acceptedTypes: string;
  @Input() justIcon: boolean;
  @Input() label: string;
  @Input() multiple: boolean;
  @Input() uploadIcon: string;
  @Output() itemUploaded = new EventEmitter();

  files: Set<File> = new Set();
  progress: { [key: string]: { progress: Observable<number>; file: any } };
  uploading: boolean;

  constructor(private uploadService: UploadService) {}

  onAddFiles(): void {
    this.file.nativeElement.click();
  }

  onFilesAdded(): void {
    const files: { [key: string]: File } = this.file.nativeElement.files;

    for (const key in files) {
      if (!isNaN(parseInt(key, 10))) {
        this.files.add(files[key]);
      }
    }

    this.uploading = true;
    this.progress = this.uploadService.upload(this.files);

    const allProgressObservables = [];
    for (const key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

    forkJoin(allProgressObservables).subscribe(() => {
      const uploadedfiles = [];
      for (const key in this.progress) {
        uploadedfiles.push(this.progress[key].file);
      }
      this.itemUploaded.emit(uploadedfiles);
      this.files.clear();
      this.uploading = false;
    });
  }
}
