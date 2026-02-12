import { Component } from '@angular/core';
import { Pages } from '../../app.routes';
import { CacheProvider } from '../../../utilities/provider/cache.provider';
import { SharedService } from '../../../utilities/services/shared.service';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
  standalone: true
})
export class TopbarComponent {
  public pages : typeof Pages = Pages;

  constructor(
    public sharedService : SharedService,
    public cacheProvider : CacheProvider
  ) {}
}
