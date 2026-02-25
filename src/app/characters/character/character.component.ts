import { Component, OnDestroy, OnInit } from '@angular/core';
import { CharactersService } from '../../../utilities/services/api/characters.service';
import { CacheProvider } from '../../../utilities/provider/cache.provider';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../utilities/services/shared.service';
import { ProjectClass } from '../../../utilities/classes/class';
import { skip, Subject, takeUntil } from 'rxjs';

export const SUMERU_LANDSCAPE_NUMBER = 7;
export const INAZUMA_LANDSCAPE_NUMBER = 8;
export const FONTAINE_LANDSCAPE_NUMBER = 11;

@Component({
  selector: 'app-character',
  imports: [CommonModule],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss',
  standalone: true
})
export class CharacterComponent implements OnInit, OnDestroy{
  public characterName : string | null = null;
  public projectClass = ProjectClass;
  private destroy$ = new Subject<void>();
  private readonly landscapeNumberMap: Record<string, number> = {
    [ProjectClass.Local.NationTypeList.SUMERU]: SUMERU_LANDSCAPE_NUMBER,
    [ProjectClass.Local.NationTypeList.INAZUMA]: INAZUMA_LANDSCAPE_NUMBER,
    [ProjectClass.Local.NationTypeList.FONTAINE]: FONTAINE_LANDSCAPE_NUMBER,
  };

  constructor(
    public charactersService : CharactersService,
    public cacheProvider : CacheProvider,
    private readonly route: ActivatedRoute,
    public sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.characterName = this.route.snapshot.paramMap.get('name');

    if (this.characterName) {
      // Skipping first null value
      this.charactersService.character$.pipe(takeUntil(this.destroy$)).pipe(skip(1)).subscribe((character) => {
        console.log("Character loaded :", character)
      })
      this.charactersService.loadCharacter(this.characterName)
    } else {
      console.error("No character name provided")
    }
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.charactersService.characterLoaded = false;
    this.charactersService.deselectCharacter();
  }

  public getLandscapeNumber(nation: string): number {
    return this.landscapeNumberMap[nation] ?? 1;
  }
}
