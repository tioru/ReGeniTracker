import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { Character, Language, StatResult } from 'genshin-db';

export const MAX_CHARACTER_LEVEL = 90;
// Niveaux où le personnage plafonne avant ascension : on affiche la ligne avant ET après ascension
export const ASCENSION_LEVELS = [20, 40, 50, 60, 70, 80];

export interface StatRow extends StatResult {
  ascended: boolean;
}

@Component({
  selector: 'app-test-lib',
  imports: [CommonModule, FormsModule],
  templateUrl: './test-lib.component.html',
  styleUrl: './test-lib.component.scss',
  standalone: true
})
export class TestLibComponent implements OnInit {
  public genshindb? : typeof import('genshin-db');
  public query : string = 'Furina';
  public names : string[] = [];
  public result? : Character;
  public statRows : StatRow[] = [];
  public error? : string;

  async ngOnInit(): Promise<void> {
    // Import dynamique : la lib embarque toutes ses données, on évite de les mettre dans le bundle principal
    try {
      this.genshindb = await import('genshin-db');
      this.names = this.genshindb.characters('names', { matchCategories: true }) as string[];
      this.search();
    } catch (e) {
      this.error = String(e);
    }
  }

  public search(): void {
    if (!this.genshindb) return;
    this.result = this.genshindb.characters(this.query, { resultLanguage: 'French' as Language });
    this.statRows = this.result ? this.buildStatRows(this.result) : [];
    console.log('genshin-db result', this.result);
  }

  private buildStatRows(character: Character): StatRow[] {
    const rows: StatRow[] = [];
    for (let level = 1; level <= MAX_CHARACTER_LEVEL; level++) {
      if (ASCENSION_LEVELS.includes(level)) {
        rows.push({ ...character.stats(level, '-'), ascended: false });
        rows.push({ ...character.stats(level, '+'), ascended: true });
      } else {
        rows.push({ ...character.stats(level), ascended: false });
      }
    }
    return rows;
  }

  // La maîtrise élémentaire est une valeur brute, les autres stats spécialisées sont des ratios
  public formatSpecialized(value?: number): string {
    if (value === undefined) return '-';
    if (this.result?.substatType === 'FIGHT_PROP_ELEMENT_MASTERY') return Math.round(value).toString();
    return `${(value * 100).toFixed(1)}%`;
  }
}
