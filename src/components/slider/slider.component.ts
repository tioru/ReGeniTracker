import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'slider-component',
  imports: [FormsModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})

export class SliderComponent {
  @Input() min: number = 0;
  @Input() max: number = 10;

  value: number = 0;
  tooltipPosition: string = '0%';
}
