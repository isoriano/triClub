import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

import { ButtonComponent } from '@isg/ui';

@Component({
  selector: 'tcs-theme-switch',
  templateUrl: 'theme-switch.component.html',
  standalone: true,
  imports: [CommonModule, ButtonComponent, MatIconModule, TranslateModule],
})
export class ThemeSwitchComponent {
  @Output() switchTheme = new EventEmitter();

  // TODO: Move to footer
  // langSelected: FormControl;
  // languages = [
  //   { name: 'English', value: 'en' },
  //   { name: 'Spanish', value: 'es' },
  // ];

  // constructor(private translate: TranslateService) {
  //   this.langSelected = new FormControl('en');
  // }

  // get langNameSelected(): string {
  //   return this.languages.find((lang) => lang.value === this.langSelected.value)
  //     ?.name;
  // }

  // ngOnInit(): void {
  //   this.langSelected.valueChanges
  //     .pipe(tap((value) => this.translate.use(value)))
  //     .subscribe();
  // }

  onSwitchTheme(): void {
    this.switchTheme.emit();
  }
}
