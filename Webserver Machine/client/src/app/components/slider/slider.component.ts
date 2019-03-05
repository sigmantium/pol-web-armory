// Core
import { Component } from '@angular/core';

// Interface
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
  // Image file paths
  imageUrls: (string | IImage)[] = [
    { url: 'assets/images/slideshow/shrines.jpg' },
    { url: 'assets/images/slideshow/dung02.jpg' },
    { url: 'assets/images/slideshow/jail.jpg' },
    { url: 'assets/images/slideshow/bank.jpg' },
    { url: 'assets/images/slideshow/spanky.jpg' }
  ];

  /**
   * Class Description Title
   * @class SliderComponent
   * @classdesc Slider component class
   */
  constructor() { }
}
