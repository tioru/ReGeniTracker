import { Component, Input } from '@angular/core';

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
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent {
  @Input() ballSize : BallSize = BallSize.NORMAL
  @Input() sliderTheme : SliderTheme = SliderTheme.DARK
}
