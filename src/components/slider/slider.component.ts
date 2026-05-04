import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() value: number = 0;
  @Input() tooltip: boolean = true;
  @Output() valueChange = new EventEmitter<number>();
}
