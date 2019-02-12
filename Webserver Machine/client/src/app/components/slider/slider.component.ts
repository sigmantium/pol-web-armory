import { Component } from '@angular/core';

export interface IImage {
  url: string | null;
  href?: string;
  clickAction?: Function;
  caption?: string;
  title?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
}

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {

  imageUrls: (string | IImage)[] = [
    { url: 'assets/images/slideshow/shrines.jpg' },
    { url: 'assets/images/slideshow/dung02.jpg' },
    { url: 'assets/images/slideshow/jail.jpg' },
    { url: 'assets/images/slideshow/bank.jpg' },
    { url: 'assets/images/slideshow/spanky.jpg' }
  ];

}
