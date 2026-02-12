import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CacheProvider } from '../../utilities/provider/cache.provider';
import { CharactersService } from '../../utilities/services/api/characters.service';
import { SharedService } from '../../utilities/services/shared.service';
import { Pages } from '../app.routes';

@Component({
  selector: 'app-characters',
  imports: [CommonModule],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
  standalone: true
})
export class CharactersComponent implements OnInit, OnDestroy{
  public pages : typeof Pages = Pages;

  constructor(
    public charactersService : CharactersService,
    public cacheProvider : CacheProvider,
    public sharedService : SharedService
  ) {}

  ngOnInit(): void {
    this.charactersService.loadCharacters();
  }

  ngOnDestroy(): void {
    this.charactersService.charactersLoaded = false;
  }
}
