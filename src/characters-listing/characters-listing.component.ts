import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../utilities/services/api/characters.service';
import { CommonModule } from '@angular/common';
import { CacheService } from '../utilities/services/cache.service';

@Component({
  selector: 'app-characters-listing',
  imports: [CommonModule],
  templateUrl: './characters-listing.component.html',
  styleUrl: './characters-listing.component.scss',
  standalone: true
})
export class CharactersListingComponent implements OnInit{
  constructor(
    public charactersService : CharactersService,
    public cacheService : CacheService
  ) {}

  ngOnInit(): void {
    this.charactersService.loadCharacters();
  }
}
