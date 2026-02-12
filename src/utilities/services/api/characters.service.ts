import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProjectClass } from "../../classes/class";
import { environment } from "../../../environments/environment";
import { BehaviorSubject, catchError, firstValueFrom, forkJoin, map, Observable, of, switchMap } from "rxjs";
import { CacheProvider } from "../../provider/cache.provider";
import { CharactersMapper } from "../../mapper/character/characters";
import { CharacterMapper } from "../../mapper/character/character";

const TTL_EXPIRATION_MINUTES = 60;
const CHARACTER_CACHE_KEY = "_character";
const CHARACTERS_CACHE_KEY = "characters";
const CHARACTERS_NAME_CACHE_KEY = "characters_name";

@Injectable({
    providedIn: 'root'
})
export class CharactersService {
  constructor(
    public http: HttpClient,
    private readonly cacheProvider: CacheProvider,
    private readonly charactersMapper: CharactersMapper,
    private readonly characterMapper: CharacterMapper
  ){}

  private readonly charactersSubject = new BehaviorSubject<ProjectClass.Local.Characters[]>([]);
  public characters$ = this.charactersSubject.asObservable();

  private readonly loadedCharactersSubject = new BehaviorSubject<ProjectClass.Local.Character | null>(null);
  public loadedCharacter$ = this.loadedCharactersSubject.asObservable();

  public charactersLoaded : boolean = false;
  public characterLoaded : boolean = false;
  private readonly defaultTTL = TTL_EXPIRATION_MINUTES * 60 * 1000;

  private getHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    });
  }

  public loadCharactersName(): Observable<Array<string> | null> {
    const nameEntry = this.cacheProvider.get<Array<string>>(CHARACTERS_NAME_CACHE_KEY);

    if (nameEntry) {
      return of(nameEntry);
    }

    return this.http.get<Array<string>>(`${environment.apiUrl}/characters`, { headers: this.getHttpHeaders(), observe: 'response' }).pipe(map((response) => {
      const charactersName = response.body;

      if (!charactersName) {
        return charactersName;
      }
      
      this.cacheProvider.set(CHARACTERS_NAME_CACHE_KEY, charactersName, this.defaultTTL);
      
      return charactersName;
      })
    );
  }

  public async loadCharacters(): Promise<void> {
    const charactersEntry = this.cacheProvider.get<ProjectClass.Local.Characters[]>(CHARACTERS_CACHE_KEY);

    if (charactersEntry) {
      this.charactersLoaded = true;
      this.charactersSubject.next(charactersEntry);
    } else {
      this.charactersLoaded = false;
      const charactersName = await firstValueFrom(this.loadCharactersName());
  
      if (!charactersName) {
        return;
      }

      const characterRequests = charactersName.map(name => {
        const generalInformationRequest = this.http.get(`${environment.apiUrl}/characters/${name}`, {
          headers: this.getHttpHeaders(),
          observe: 'response'
        }).pipe(
          map((response) => {
            const character = response.body as ProjectClass.Remote.Characters;
            return { 
              vision_key: character.vision_key,
              release: character.release
            };
          })
        );
    
        return forkJoin([generalInformationRequest]).pipe(
          map(([generalData]) =>
            this.charactersMapper.mapRemote( 
              new ProjectClass.Remote.Characters(
                { 
                  name: name, 
                  img: `${environment.apiUrl}/characters/${name}/portrait`, 
                  vision_key: generalData.vision_key, 
                  release: generalData.release 
                }
              )
            )
          )
        );
      });

      forkJoin(characterRequests).subscribe(characters => {
        this.charactersLoaded = true;
        this.charactersSubject.next(characters);
        this.cacheProvider.set(CHARACTERS_CACHE_KEY, characters, this.defaultTTL);
      });
    }
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

  public loadCharacter(characterName: string): void {
    const entry = this.cacheProvider.get<ProjectClass.Remote.Character>(characterName);

    if (entry) {
      this.loadedCharactersSubject.next(this.characterMapper.mapRemote(entry));
      this.characterLoaded = true;
    } else {
      this.http.get(`${environment.apiUrl}/characters/${characterName}`, {headers: this.getHttpHeaders(),observe: 'response'}).subscribe((response) => {
        const loadedCharacter = response.body ? new ProjectClass.Remote.Character(response.body) : null;
        const etag = response.headers.get('ETag');

        if (loadedCharacter) {
          this.loadedCharactersSubject.next(this.characterMapper.mapRemote(loadedCharacter));
          this.cacheProvider.set(characterName + CHARACTER_CACHE_KEY, { loadedCharacter, etag }, this.defaultTTL);

          this.characterLoaded = true;
        }
      })
    }
  }

  public deselectCharacter(): void {
    this.loadedCharactersSubject.next(null);
  }
}
