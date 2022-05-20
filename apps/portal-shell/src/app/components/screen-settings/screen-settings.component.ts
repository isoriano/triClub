import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'tcs-screen-settings',
  templateUrl: 'screen-settings.component.html',
  styleUrls: [
    './screen-settings.component.scss',
    './_screen-settings-theme.component.scss',
  ],
})
export class ScreenSettingsComponent implements OnInit {
  @Output() switchTheme = new EventEmitter();

  langSelected: FormControl;
  get langNameSelected() {
    return this.languages.find((lang) => lang.value === this.langSelected.value)
      ?.name;
  }

  languages = [
    { name: 'English', value: 'en' },
    { name: 'Spanish', value: 'es' }
  ];

  constructor(private translate: TranslateService) {
    this.langSelected = new FormControl('en');
  }

  ngOnInit() {
    this.langSelected.valueChanges
      .pipe(tap((value) => this.translate.use(value)))
      .subscribe();
  }

  onSwitchTheme() {
    this.switchTheme.emit();
  }
}
