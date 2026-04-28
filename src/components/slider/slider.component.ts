import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import {CdkDrag} from '@angular/cdk/drag-drop';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderComponent),
      multi: true
    }
  ]
})

export class SliderComponent implements ControlValueAccessor{
  @Input() ballSize : BallSize = BallSize.BIG
  @Input() sliderTheme : SliderTheme = SliderTheme.DARK
  @Input() step : number = 0;
  @Input() min : number = 0;
  @Input() max :  number = 0;

  private totalAnchor: number = 0;
  public anchors: number[] = [];

  private currentValue : number = 0;

  ngOnInit(): void {
    this.totalAnchor = (this.max + 1) - this.min;
    this.anchors = Array.from({ length: this.totalAnchor }, (_, i) => this.min + i);
  }
  
  onChange = (value: number) => {};
  onTouched = () => {};

  writeValue(value: number): void {
    this.currentValue = value;
  }
  
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  public test(): void {
    console.log("shfhjsdgfsd")
  }
}
