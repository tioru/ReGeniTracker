import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'tab-item-component',
  imports: [],
  templateUrl: './tab-item.component.html',
  styleUrl: './tab-item.component.scss',
})
export class TabItemComponent {
  @Input() header: string = '';
  @ViewChild('tabContent') content!: TemplateRef<any>;
  @ViewChild('tabHeader') headerTpl!: TemplateRef<any>;
}
