import { Component, OnDestroy, OnInit } from '@angular/core';
import { CharactersService } from '../../../utilities/services/api/characters.service';
import { CacheProvider } from '../../../utilities/provider/cache.provider';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-character',
  imports: [CommonModule],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss',
  standalone: true
})
export class CharacterComponent implements OnInit, OnDestroy{
  public characterName : string | null = null;

  constructor(
    public charactersService : CharactersService,
    public cacheProvider : CacheProvider,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.characterName = this.route.snapshot.paramMap.get('name');

    if (this.characterName) {
      this.charactersService.loadCharacter(this.characterName)
      this.charactersService.character$.subscribe((character) => {
        console.log("Character loaded :", character)
      })
    } else {
      console.error("No character name provided")
    }
  }
  
  ngOnDestroy(): void {
    this.charactersService.characterLoaded = false;
  }
}
