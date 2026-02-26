import { Component, OnDestroy, OnInit } from '@angular/core';
import { CharactersService } from '../../../utilities/services/api/characters.service';
import { CacheProvider } from '../../../utilities/provider/cache.provider';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../utilities/services/shared.service';
import { ProjectClass } from '../../../utilities/classes/class';
import { skip, Subject, takeUntil } from 'rxjs';

export const MONDSTADT_LANDSCAPE_NUMBER = 4;
export const LIYUE_LANDSCAPE_NUMBER = 5;
export const INAZUMA_LANDSCAPE_NUMBER = 8;
export const SUMERU_LANDSCAPE_NUMBER = 7;
export const FONTAINE_LANDSCAPE_NUMBER = 11;
export const NATLAN_LANDSCAPE_NUMBER = 9;
export const NODKRAI_LANDSCAPE_NUMBER = 9;

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
    [ProjectClass.Local.NationTypeList.MONDSTADT]: MONDSTADT_LANDSCAPE_NUMBER,
    [ProjectClass.Local.NationTypeList.LIYUE]: LIYUE_LANDSCAPE_NUMBER,
    [ProjectClass.Local.NationTypeList.INAZUMA]: INAZUMA_LANDSCAPE_NUMBER,
    [ProjectClass.Local.NationTypeList.SUMERU]: SUMERU_LANDSCAPE_NUMBER,
    [ProjectClass.Local.NationTypeList.FONTAINE]: FONTAINE_LANDSCAPE_NUMBER,
    [ProjectClass.Local.NationTypeList.NATLAN]: NATLAN_LANDSCAPE_NUMBER,
    [ProjectClass.Local.NationTypeList.NODKRAI]: NODKRAI_LANDSCAPE_NUMBER,
  };

  public currentIndex = 0;
  public slideDuration = 1000;
  private slideTimer: any;

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
        if (character?.nation) {
          this.startDotTimer(character.nation);
        }
      });
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
    clearTimeout(this.slideTimer);
  }

  public getLandscapeNumber(nation: string): number {
    return this.landscapeNumberMap[nation] || 0;
  }

  public goToSlide(index : number, nation: string) : void {
    clearTimeout(this.slideTimer);
    this.currentIndex = index;
    this.startDotTimer(nation);
  }

  public startDotTimer(nation : string) : void {
    this.slideTimer = setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.getLandscapeNumber(nation);
      this.startDotTimer(nation);
    }, this.slideDuration * 10);
  }
}
