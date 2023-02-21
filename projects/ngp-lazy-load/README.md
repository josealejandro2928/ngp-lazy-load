# NgpLazyLoad

It is a directive developed in angular for the lazy loading of images, iframe, object and any content that have children nodes
### Installation
```sh
npm i ngp-lazy-load --save
```
### Usages
You must import the module `NgpLazyLoadModule` where you will use it.
```typescript
***
import { NgpLazyLoadModule } from 'ngp-lazy-load';
@NgModule({
  ***
  imports: [
    NgpLazyLoadModule,
  ],
****
})
```

The ngp-lazy directive is placed on each i tag that requires lazy loading of the content:

```html
<img ngp-lazy [src]="image.image" />

<video controls ngp-lazy src="../assets/media/video.mp4#t=2">
</video>
```
In the examples above, we were applying lazy load to elements with the src property (video, img, iframes).
When we want to apply it to html content of a specific div using the "data-src" attribute we can do the lazy loading
```html
 <section ngp-lazy data-src="true">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum aut consectetur illo velit ad! Sed, distinctio
        pariatur? Est dicta amet consequatur consectetur ullam libero! Sed quis laboriosam qui aliquam quae?</p>
     <app-dummy></app-dummy>
</section>
```

When the element or the content is fully loaded. The directive emits an Output with that element.
```html
 <div ($mediaLoaded)="onMediaLoaded($event)" ngp-lazy ngp-threshold="1" data-src="true" class="source-container">
    <iframe  src="https://www.youtube.com/embed/9v0uZS8ro68" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>
 </div>
```

### More configuration
You can change the detection threshold of the elemnt and the opacity to load time to give a better transition to the user

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
