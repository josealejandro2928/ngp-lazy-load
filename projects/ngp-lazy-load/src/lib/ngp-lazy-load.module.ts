import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadDirective } from './ngp-lazy-load.directive';

@NgModule({
  declarations: [LazyLoadDirective],
  imports: [CommonModule],
  exports: [LazyLoadDirective],
})
export class NgpLazyLoadModule {}
