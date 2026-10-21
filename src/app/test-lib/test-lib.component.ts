import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { Character, Language } from 'genshin-db';

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
    console.log('genshin-db result', this.result);
  }
}
