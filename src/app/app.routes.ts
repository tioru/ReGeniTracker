import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CharactersComponent } from './characters/characters.component';

export enum Pages {
  HOME = "",
  CHARACTERS_LISTING = "characters"
}

export const routes: Routes = [
    { path: Pages.HOME, component: HomeComponent },
    { path: Pages.CHARACTERS_LISTING, component: CharactersComponent}
];
