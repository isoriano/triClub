/* How to use:

<p *loading="isLoading">
    Some content
    <span *loading="isOtherLoading">
        Some other content
    </span>
    <p *loading="isEvenMoreLoading">
        Even more content
    </p>
</p>

*/

import { ComponentRef, Directive, DoCheck, EmbeddedViewRef, inject, Input, OnChanges, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { LoaderOverlayComponent } from '../components';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[loading]',
  standalone: true
})
export class LoaderOverlayDirective implements OnInit, OnChanges, DoCheck {
  @Input() loading = false;

  templateView: EmbeddedViewRef<any>;
  loaderRef: ComponentRef<LoaderOverlayComponent>;

  private readonly templateRef = inject(TemplateRef);
  private readonly vcRef = inject(ViewContainerRef);

  ngOnInit(): void {
    this.templateView = this.templateRef.createEmbeddedView({});
    this.loaderRef = this.vcRef.createComponent(LoaderOverlayComponent, {
      injector: this.vcRef.injector,
      projectableNodes: [this.templateView.rootNodes]
    });

    this.loaderRef.setInput('loading', this.loading);
  }

  ngOnChanges(): void {
    this.loaderRef?.setInput('loading', this.loading);
  }

  ngDoCheck(): void {
    this.templateView?.detectChanges();
  }
}
