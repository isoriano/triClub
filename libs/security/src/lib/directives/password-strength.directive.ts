/* How to use:

bootstrapApplication(AppComponent, {
  providers: [
    providePasswordEvaluatorFn((password: string) => {
      if (password.length < 6) {
        return 'weak';
      } else if (password.length < 10) {
        return 'medium';
      }
      return 'strong';
    }),
  ],
  // the rest of the application
});

OR

<input type="password" #evaluator="passwordEvaluator" [evaluatorFn]="myEvaluatorFn"/>

<div *ngIf="evaluator.strength === 'weak'">Weak password</div>
<div *ngIf="evaluator.strength === 'medium'">Medium password</div>
<div *ngIf="evaluator.strength === 'strong'">Strong password</div>

*/
import { Directive, HostListener, inject, InjectionToken, Input } from '@angular/core';

type PasswordStrength = 'weak' | 'medium' | 'strong';

type PasswordEvaluatorFn = (password: string) => PasswordStrength;

export const evaluatorFnToken = new InjectionToken<PasswordEvaluatorFn>('PasswordEvaluatorFn');

export function providePasswordEvaluatorFn(evaluatorFn: PasswordEvaluatorFn) {
  return [
    {
      provide: evaluatorFnToken,
      useValue: evaluatorFn
    }
  ];
}

export const defaultEvaluatorFn: PasswordEvaluatorFn = (password: string): PasswordStrength => {
  if (password.length < 6) {
    return 'weak';
  }

  if (password.length < 10) {
    return 'medium';
  }
  return 'strong';
};

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'input[type="password"]',
  standalone: true,
  exportAs: 'passwordEvaluator'
})
export class PasswordStrengthDirective {
  @Input() noStrengthCheck = false;
  @Input() evaluatorFn = inject(evaluatorFnToken, { optional: true }) ?? defaultEvaluatorFn;

  strength: PasswordStrength = 'weak';

  @HostListener('input', ['$event'])
  onInput(event: InputEvent): void {
    if (this.noStrengthCheck) {
      return;
    }

    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.strength = this.evaluatorFn(value);
  }
}
