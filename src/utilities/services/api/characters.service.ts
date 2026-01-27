import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProjectClass } from "../../classes/class";
import { environment } from "../../../environments/environment";
import { BehaviorSubject, catchError, forkJoin, from, map, Observable, of, switchMap } from "rxjs";
import { CacheService } from "../cache.service";

const CHARACTERS_LISTING_CACHE_KEY = 'characters_listing_cache_key';
const CHARACTER_CACHE_KEY = '_character_cache_key';

@Injectable({
    providedIn: 'root'
})
export class CharactersService{
  constructor(
    public http: HttpClient,
    private readonly cacheService: CacheService
  ){}

  private readonly charactersListingSubject = new BehaviorSubject<ProjectClass.Remote.CharacterListing[]>([]);
  public charactersListing$ = this.charactersListingSubject.asObservable();

  private readonly selectedCharactersSubject = new BehaviorSubject<ProjectClass.Remote.Character | null>(null);
  public selectedCharacter$ = this.selectedCharactersSubject.asObservable();

  public charactersListingLoaded : boolean = false;

  private getHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    });
  }

  public loadCharacters(): void {
    from(this.cacheService.get<ProjectClass.Remote.CharacterListing[]>(CHARACTERS_LISTING_CACHE_KEY)).pipe(
      switchMap(cached => {
        if (cached) {
          return of(cached);
        }

        return this.getCharactersLiteInformations().pipe(
          switchMap(characters => from(
            this.cacheService.set(CHARACTERS_LISTING_CACHE_KEY, characters).then(() => characters)
          ))
        );
      })
    ).subscribe(characters => {
      this.charactersListingSubject.next(characters);
      this.charactersListingLoaded = true;
    });
  }

  public getCharactersLiteInformations(): Observable<Array<ProjectClass.Remote.CharacterListing>> {
    return this.http.get<Array<string>>(`${environment.apiUrl}/characters`, { headers: this.getHttpHeaders(), observe: 'response' }).pipe(
      switchMap(response => {
        const names = response.body || [];
        if (names.length === 0) {
          return of([]);
        }
    
        const characterRequests = names.map(name => {
          const generalInformationRequest = this.http.get(`${environment.apiUrl}/characters/${name}`, {
            headers: this.getHttpHeaders(),
            observe: 'response'
          }).pipe(
            map((response) => {
              const character = response.body as ProjectClass.Remote.Character
              return { 
                vision: character.vision,
                release: character.release
              };
            })
          );
    
          const iconRequest = this.http.get(`${environment.apiUrl}/characters/${name}/icon-big`, {
            headers: this.getHttpHeaders(),
            observe: 'response',
            responseType: 'blob'
          }).pipe(
            map(iconResponse => iconResponse.body ? URL.createObjectURL(iconResponse.body) : '')
          );
    
          return forkJoin([generalInformationRequest, iconRequest]).pipe(
            map(([generalData, icon]) =>
              new ProjectClass.Remote.CharacterListing({ name, icon, vision: generalData.vision, release: generalData.release })
            )
          );
        });
        return forkJoin(characterRequests);
      }),
    );
  }

  public getCharacterArts(characterName: string): Observable<ProjectClass.Remote.CharacterArts> {
    const artRequests = ProjectClass.Remote.CharacterArtsArray.map((artType) => {
      return this.http.get(`${environment.apiUrl}/characters/${characterName}/${artType}`, {
        headers: this.getHttpHeaders(),
        observe: 'response',
        responseType: 'blob'
      }).pipe(
        map(response => ({
          type: artType,
          url: response.body ? URL.createObjectURL(response.body) : null
        })),
        catchError(() => of({ type: artType, url: null }))
      );
    });
      
    return forkJoin(artRequests).pipe(
      map(arts => {
        const characterArts = new ProjectClass.Remote.CharacterArts;

        arts.forEach(art => {
          characterArts[art.type] = art.url;
        });

        return characterArts;
      })
    );
  }    

  public loadCharacter(characterName : string) : void {
    console.log('Loading character:', characterName);
    from(this.cacheService.get<ProjectClass.Remote.Character>(characterName + CHARACTER_CACHE_KEY)).pipe(
      switchMap(cached => {
        if (cached) {
          return of(cached);
        }

        return this.http.get(`${environment.apiUrl}/characters/${characterName}`, { headers: this.getHttpHeaders(), observe: 'response'}).pipe(
          map(response => response.body ? new ProjectClass.Remote.Character(response.body) : new ProjectClass.Remote.Character()), switchMap(character => from(
            this.cacheService.set(characterName + CHARACTER_CACHE_KEY, character).then(() => character)
          ))
        );
      })
    ).subscribe(character => {
      this.selectedCharactersSubject.next(character);
      this.charactersListingLoaded = true;
    });
  }

  public deselectCharacter(): void {
    this.selectedCharactersSubject.next(null);
  }
}
