// Core
import {
  Component, OnInit, OnDestroy, Input, ElementRef, AfterViewInit, ViewChild
} from '@angular/core';

// Libraries
import { Subject } from 'rxjs';

// Models
import { Equipment } from 'src/app/models/equipment.model';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit, OnDestroy, AfterViewInit {
  // Variables for the Canvas
  @Input()
  armorySubject: Subject<Equipment[]>;

  @ViewChild('canvas')
  public canvas: ElementRef;

  @Input()
  public width = 260;

  @Input()
  public height = 237;

  private cx: CanvasRenderingContext2D;

  // Equipment to show
  equipmentInfo: Equipment[];

  /**
   * Class Description Title
   * @class CanvasComponent
   * @classdesc Canvas component class
   */
  constructor() {}

  /**
   * ngOnInit Description
   * Initiates and assigns all variables
   * Subscribes armory subject
   * @method CanvasComponent#ngOnInit
   * @returns {void}
   */
  ngOnInit(): void {
    this.armorySubject.subscribe(event => {
      // Assign event to equipmentInfo
      this.equipmentInfo = event;

      console.log('Equipment info: ' + this.equipmentInfo);

      // Sort the array based on layers
      this.equipmentInfo.sort((a, b) => a.layer - b.layer);

      // Foreach the equipmentInfo
      this.equipmentInfo.forEach(equipment => this.renderImage(Number(equipment.objtype), Number(equipment.color)));
    });
  }

  /**
   * ngOnDestroy Description
   * Unsubscribes all subscriptions
   * @method CanvasComponent#ngOnDestroy
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.armorySubject.unsubscribe();
  }

  /**
   * ngAfterViewInit Description
   * Assign variables after view is initialized
   * @method CanvasComponent#ngAfterViewInit
   * @returns {void}
   */
  public ngAfterViewInit(): void {
    // Get context
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    // Set height and width
    canvasEl.width = this.width;
    canvasEl.height = this.height;
  }

  /**
   * renderImage Description
   * Renders an image on the canvas based on whats in the equipment-variable
   * @method CanvasComponent#ngAfterViewInit
   * @returns {void}
   */
  private renderImage(objtype: number, color: number): void {
    // Clear canvas
    this.cx.clearRect(0, 0, this.width, this.height);

    // Create Image object and attach image
    const image = new Image();
    image.src = './assets/images/' + objtype + '.png';

    // Once the image is loaded
    image.onload = () => {
      this.cx.drawImage(image, 0, 0, this.width, this.height);

      /**
      const img = this.cx.getImageData(0, 0, this.width, this.height);
      const imgData = img.data;

      // Loops through bytes and change pixel to white if alpha is not zero.
      for (let i = 0; i < imgData.length; i += 4 ) {
          if ( imgData[i + 3] !== 0 ) {
              imgData[i] = 250;
              imgData[i + 1] = 50;
              imgData[i + 2] = 50;
              imgData[i + 3] = 250;
          }
      }

      // Draw the results
      this.cx.putImageData(img, 0, 0);
      */
    };
  }

}
