import { Directive, ViewContainerRef, TemplateRef, ChangeDetectorRef, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { IUser } from '../models/user.interface';
import * as userSelectors from '../store/selectors/user.selectors';

@Directive({
  selector: '[isAuthorized]'
})
export class IsAuthorizedDirective {

  isLoggedIn: boolean;
  isElementShown = false;

  private logged: boolean;

  @Input() set isAuthorized(logged: boolean) {
    this.logged = logged;
    // this.check();
  }

  constructor(
    private store: Store<IUser>,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.store.pipe(select(userSelectors.getUid)).subscribe((uid) => this.check(!!uid));
  }

  private check(isLoggedIn) {
    const removeElement = (!isLoggedIn && this.logged) || (isLoggedIn && !this.logged);
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
