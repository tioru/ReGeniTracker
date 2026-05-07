import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'tab-item-component',
  imports: [],
  templateUrl: './tab-item.component.html',
  styleUrl: './tab-item.component.scss',
})
export class TabItemComponent {
  @Input() header: string = '';
  @ContentChild('tabHeader') headerTpl!: TemplateRef<any>;
  @ContentChild('tabContent') content!: TemplateRef<any>;
}
