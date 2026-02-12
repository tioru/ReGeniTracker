import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CharactersComponent } from './characters/characters.component';
import { CharacterComponent } from './characters/character/character.component';

export enum Pages {
  HOME = "",
  CHARACTERS_LISTING = "characters",
  CHARACTER = "character/:name"
};

export const routes: Routes = [
  { path: Pages.HOME, component: HomeComponent },
  { path: Pages.CHARACTERS_LISTING, component: CharactersComponent },
  { path: Pages.CHARACTER, component: CharacterComponent }
];
