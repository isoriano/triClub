import { Directive, ViewContainerRef, TemplateRef, ChangeDetectorRef, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Directive({
  selector: '[isAuthorized]'
})
export class IsAuthorizedDirective {

  isLoggedIn: boolean;
  isElementShown = false;

  private logged: boolean;

  @Input() set isAuthorized(logged: boolean) {
    this.logged = logged;
    this.check();
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthenticationService,
    private cdr: ChangeDetectorRef
  ) {
    this.authService.currentUser.subscribe(() => this.check());
  }

  private check() {

    const removeElement = (!this.authService.authenticated && this.logged) || (this.authService.authenticated && !this.logged);
    if (removeElement) {
      this.viewContainer.clear();
      this.isElementShown = false;
    } else {
      if (!this.isElementShown) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.isElementShown = true;
        this.cdr.detectChanges();
      }
    }
  }
}
