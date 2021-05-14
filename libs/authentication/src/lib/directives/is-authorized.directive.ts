import { Directive, ViewContainerRef, TemplateRef, ChangeDetectorRef, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { IUser } from '../models/user.interface';
import * as userSelectors from '../store/selectors/user.selectors';

@Directive({
  selector: '[isAuthorized]'
})
export class IsAuthorizedDirective implements OnInit{

  isLoggedIn: boolean;
  isElementShown = false;

  private logged: boolean;

  @Input() set isAuthorized(logged: boolean) {
    this.logged = logged;
    // this.check();
  }

  constructor(
    private store: Store<IUser>,
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.store.pipe(select(userSelectors.getUid)).subscribe((uid) => this.check(!!uid));
  }

  private check(isLoggedIn: boolean) {
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
