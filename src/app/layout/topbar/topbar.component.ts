import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pages } from '../../app.routes';
import { CacheProvider } from '../../../utilities/provider/cache.provider';

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
    public router: Router,
    public cacheProvider : CacheProvider
  ) {}

  public goTo(path : Pages) : void {
    this.router.navigateByUrl(path)
  }
}
