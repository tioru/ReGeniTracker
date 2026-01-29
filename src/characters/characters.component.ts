import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../utilities/services/api/characters.service';
import { CommonModule } from '@angular/common';
import { CacheProvider } from '../utilities/provider/cache.provider';

@Component({
  selector: 'app-characters',
  imports: [CommonModule],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
  standalone: true
})
export class CharactersComponent implements OnInit{
  constructor(
    public charactersService : CharactersService,
    public cacheProvider : CacheProvider
  ) {}

  ngOnInit(): void {
    this.charactersService.loadCharacters();
  }
}
