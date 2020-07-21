import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: 'img[ngp-lazy]',
})
export class LazyLoadDirective implements AfterViewInit, OnDestroy {
  @HostBinding('attr.src') srcAttr;
  srcFull = '';
  _threshold = 0.1;
  _opacityDuration = '.5s';

  @Input() set src(value) {
    this.srcFull = value + '';
  }

  @Input('ngp-threshold') set threshold(value) {
    this._threshold = value + 0;
  }

  @Input('ngp-opacity-duration') set opacityDuration(value) {
    let reg = /^\d+(\.\d+)?s/;
    if (reg.test(value)) {
      this._opacityDuration = value + '';
    }
  }

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.opacity = 0;
  }

  ngAfterViewInit() {
    this.canLazyLoad() ? this.lazyLoadImage() : this.loadImage();
    this.el.nativeElement.addEventListener('load', () => {
      this.el.nativeElement.style.transition = `all ${this._opacityDuration} ease`;
      this.el.nativeElement.style.opacity = 1;
    });
  }

  ngOnDestroy() {
    this.el.nativeElement.removeEventListener('load', () => {});
  }

  private canLazyLoad() {
    return window && 'IntersectionObserver' in window;
  }

  private lazyLoadImage() {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ isIntersecting }) => {
          if (isIntersecting) {
            this.loadImage();
            obs.unobserve(this.el.nativeElement);
          }
        });
      },
      { threshold: this._threshold }
    );
    obs.observe(this.el.nativeElement);
  }

  private loadImage() {
    this.srcAttr = this.srcFull;
  }
}
