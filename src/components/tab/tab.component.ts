import { CommonModule } from '@angular/common';
import { Component, ContentChildren, QueryList } from '@angular/core';
import { TabItemComponent } from './tab-item/tab-item.component';

@Component({
  selector: 'tab-component',
  imports: [CommonModule],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss',
})
export class TabComponent {
  @ContentChildren(TabItemComponent) tabs!: QueryList<TabItemComponent>;
  activeIndex = 0;

  ngAfterContentInit() {}

  selectTab(index: number) {
    this.activeIndex = index;
  }
}
