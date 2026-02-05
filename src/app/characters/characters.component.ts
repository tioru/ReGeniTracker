import { Component, OnInit, Sanitizer } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CacheProvider } from '../../utilities/provider/cache.provider';
import { CharactersService } from '../../utilities/services/api/characters.service';
import { ProjectClass } from '../../utilities/classes/class';

@Component({
  selector: 'app-characters',
  imports: [CommonModule],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
  standalone: true
})
export class CharactersComponent implements OnInit{
  public characterInfoDialogOpen : boolean = false;

  constructor(
    public charactersService : CharactersService,
    public cacheProvider : CacheProvider
  ) {}

  ngOnInit(): void {
    this.charactersService.loadCharacters();
  }

  public openCharacterInfo(character : ProjectClass.Local.Characters) : void {
    if (character.name) {
      console.log("Loading character info for:", character.name);
      this.charactersService.loadCharacter(character.name);
    }
  }
}
