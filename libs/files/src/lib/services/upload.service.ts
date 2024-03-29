import { HttpClient, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UploadService {
  private authToken: string;
  private httpClient = inject(HttpClient);

  constructor(authService: AuthService) {
    authService.getAccessTokenSilently().subscribe((token) => (this.authToken = token));
  }

  public upload(files: Set<File>): {
    [key: string]: { progress: Observable<number>; file: any };
  } {
    const status: { [key: string]: { progress: Observable<number>; file: any } } = {};

    files.forEach((file) => {
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      const progress = new Subject<number>();
      const req = new HttpRequest('POST', 'http://localhost:1337/api/upload', formData, {
        reportProgress: true
      });

      this.httpClient.request(req).subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round((100 * event.loaded) / event.total);
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {
          status[file.name].file = (event.body as any).file;
          progress.complete();
        }
      });

      status[file.name] = { progress: progress.asObservable(), file: null };
    });

    return status;
  }
}
