import {
  Component, OnInit, OnDestroy, Input, ElementRef, AfterViewInit, ViewChild
} from '@angular/core';
import { Equipment } from 'src/app/models/equipment.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input()
  armorySubject: Subject<Equipment[]>;

  @ViewChild('canvas')
  public canvas: ElementRef;

  @Input()
  public width = 260;

  @Input()
  public height = 237;

  private cx: CanvasRenderingContext2D;

  ngOnInit() {
    this.armorySubject.subscribe(event => {
      console.log('Event incoming: ' + JSON.stringify(event));
      // Re-render
    });
  }

  ngOnDestroy() {
    this.armorySubject.unsubscribe();
  }

  public ngAfterViewInit() {
    // Get context
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    // Set heigth and width
    canvasEl.width = this.width;
    canvasEl.height = this.height;

    // Default properties
    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

    this.renderImage();
  }

  private renderImage() {
    // Add image
    const image = new Image();
    image.src = './assets/images/Gump 50898.jpg';

    image.onload = () => {
      this.cx.drawImage(image, 0, 0, this.width, this.height);

      // Render away the black pixels
      const imgData = this.cx.getImageData(0, 0, this.width, this.height);
      const pixels = imgData.data;
      const pixelsLength = pixels.length;
      for (let i = 0; i < pixelsLength; i += 4) {
        if (pixels[i] < 10 && pixels[i + 1] < 10 && pixels[i + 2] < 10) {
          pixels[i] = 0;
          pixels[i + 1] = 0;
          pixels[i + 2] = 0;
          pixels[i + 3] = 0;
        }
      }

      this.cx.putImageData(imgData, 0, 0);
    };
  }
}
