# NgpLazyImage

It is a directive developed in angular for the lazy loading of images

### Installation

```sh
npm i ngp-lazy-image --save
```

### Usages

You must import the module `NgpImageLazyLoadModule` where you will use it.

```typescript
***
import { NgpImageLazyLoadModule } from 'ngp-lazy-image';
@NgModule({
  ***
  imports: [
    NgpImageLazyLoadModule,
  ],
****
})
```

The ngp-lazy directive is placed on each img tag that requires lazy loading of the image:

```html
<img ngp-lazy [src]="image.image" />
```

### More configuration

You can change the detection threshold of the image and the opacity to load time to give a better transition to the user

```html
<img
  src="https://images8.alphacoders.com/468/thumb-1920-468739.jpg"
  ngp-lazy
  ngp-threshold="0.1"
  ngp-opacity-duration="1.5s"
/>
```

### More examples

![Image Rating](https://havanatursa.com/assets/images/npm/image-lazy-load.gif)
