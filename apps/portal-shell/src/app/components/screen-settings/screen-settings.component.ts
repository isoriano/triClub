import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'tcs-screen-settings',
  templateUrl: 'screen-settings.component.html',
  styleUrls: ['./screen-settings.component.scss']
})

export class ScreenSettingsComponent implements OnInit {

  @Output() switchTheme = new EventEmitter();

  langSelected: FormControl;
  get langNameSelected() {
    return this.languages.find(lang => lang.code === this.langSelected.value)?.name;
  }

  languages = [
    { name: 'English', code: 'en' },
    { name: 'Spanish', code: 'es' }
  ];

  constructor(
    private translate: TranslateService
  ) {
    this.langSelected = new FormControl('en');
  }

  ngOnInit() {
    this.langSelected.valueChanges.pipe(tap((value) => this.translate.use(value))).subscribe();
  }

  onSwitchTheme() {
    this.switchTheme.emit();
  }
}
