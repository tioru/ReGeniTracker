import { Component, Input } from '@angular/core';
import { ProjectClass } from '../../../../utilities/classes/class';
import { TooltipComponent } from '../../../../components/tooltip/tooltip.component';
import { OverflowTooltipDirective } from '../../../../utilities/directives/overflowTooltip';

@Component({
  selector: 'app-cost-card',
  imports: [TooltipComponent, OverflowTooltipDirective],
  templateUrl: './cost-card.component.html',
  styleUrl: './cost-card.component.scss',
})
export class CostCardComponent {
  @Input() ascensionMaterials: ProjectClass.Local.AscentionMaterials[] | null = [];
  @Input() ascension: string | null = null;
}
