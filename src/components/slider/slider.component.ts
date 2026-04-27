import { Component, Input } from '@angular/core';
import {CdkDrag} from '@angular/cdk/drag-drop';

export enum BallSize {
  BIG = "big",
  NORMAL = "normal",
  SMALL = "small"
}

export enum SliderTheme {
  LIGHT = "light",
  DARK = "dark"
}

@Component({
  selector: 'slider-component',
  imports: [CdkDrag],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent {
  @Input() ballSize : BallSize = BallSize.BIG
  @Input() sliderTheme : SliderTheme = SliderTheme.DARK
}
