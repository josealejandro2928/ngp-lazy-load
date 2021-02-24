import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';

@Directive({
  selector: '[ngp-lazy]',
})
export class LazyLoadDirective implements AfterViewInit, OnDestroy {
  srcFull = null;
  _threshold = 0.25;
  _opacityDuration = '.5s';
  obs: IntersectionObserver;
  @Output() $mediaLoaded = new EventEmitter<any>();
  @Output() $mediaBeginObserved = new EventEmitter<any>();
  elRefMedia: HTMLElement;
  innerHtml: string;

  @Input() set src(value) {
    this.processSource(value);
    this.canLazyLoad() ? this.lazyLoadMedia() : this.loadMedia();
    this.eventFromDifferentResources();
  }

  @Input('data-src') set data(value) {
    this.processSource(value);
    this.canLazyLoad() ? this.lazyLoadMedia() : this.loadMedia();
    this.eventFromDifferentResources();
  }

  @Input('ngp-threshold') set threshold(value) {
    this._threshold = +value;
  }

  @Input('ngp-opacity-duration') set opacityDuration(value) {
    let reg = /^\d+(\.\d+)?s/;
    if (reg.test(value)) {
      this._opacityDuration = value + '';
    }
  }

  constructor(private el: ElementRef) {
    this.elRefMedia = this.el.nativeElement;
    this.hideStyles();
  }

  ngAfterViewInit() {
    this.$mediaBeginObserved.next(true);
    this.processElementWithChild();
  }

  ngOnDestroy() {
    this.el.nativeElement.removeEventListener('load', () => {});
    if (this.obs) {
      this.obs.unobserve(this.el.nativeElement);
    }
  }

  private canLazyLoad() {
    return window && 'IntersectionObserver' in window;
  }

  private lazyLoadMedia() {
    this.obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ isIntersecting, target }) => {
          // console.log(target, isIntersecting);
          if (isIntersecting) {
            this.loadMedia();
            this.obs.unobserve(this.el.nativeElement);
          }
        });
      },
      { threshold: this._threshold }
    );
    this.obs.observe(this.el.nativeElement);
  }

  private loadMedia() {
    if (['IFRAME', 'VIDEO', 'IMG'].includes(this.elRefMedia.tagName)) {
      const iframe = this.elRefMedia as any;
      iframe.src = this.srcFull;
    } else if (this.elRefMedia.tagName == 'OBJECT') {
      const object = this.elRefMedia as HTMLObjectElement;
      object.data = this.srcFull;
    } else {
      if (this.elRefMedia.innerHTML !== undefined) {
        this.elRefMedia.innerHTML = this.srcFull;
        this.showStyles();
        let iframe = this.elRefMedia.querySelector('iframe');
        if (iframe) {
          this.$mediaLoaded.next(iframe);
        } else {
          this.$mediaLoaded.next(this.elRefMedia);
        }
      }
    }
  }

  eventFromDifferentResources = () => {
    // IMAGE SOURCES OR IFRAMES OR OBJECT
    this.elRefMedia.addEventListener('load', () => {
      // console.log('Llego la img');
      this.showStyles();
      this.$mediaLoaded.next(this.elRefMedia);
    });
    // VIDEO SOURCES
    this.elRefMedia.addEventListener('loadeddata', () => {
      this.showStyles();
      this.$mediaLoaded.next(this.elRefMedia);
    });
  };

  processSource = (src) => {
    this.srcFull = src + '';
    if (['IFRAME', 'VIDEO', 'IMG'].includes(this.elRefMedia.tagName)) {
      const iframe = this.elRefMedia as any;
      iframe.src = '';
    }
    if (this.elRefMedia.tagName == 'OBJECT') {
      const object = this.elRefMedia as HTMLObjectElement;
      object.data = '';
    }
  };

  processElementWithChild = () => {
    if (
      !['IFRAME', 'VIDEO', 'IMG', 'OBJECT'].includes(this.elRefMedia.tagName)
    ) {
      this.srcFull = this.elRefMedia.innerHTML + '';
      this.elRefMedia.innerHTML = '';
    }
  };

  hideStyles = () => {
    // this.elRefMedia.style.background = '#e0e0e0';
    this.elRefMedia.style.opacity = '0.0';
  };

  showStyles = () => {
    this.elRefMedia.style.transition = `all ${this._opacityDuration} ease`;
    this.elRefMedia.style.opacity = '1';
    // this.elRefMedia.style.background = 'unset';
  };
}
