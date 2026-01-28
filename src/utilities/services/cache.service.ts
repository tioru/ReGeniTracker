import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

const TTL_EXPIRATION_MINUTES = 5;

@Injectable({
    providedIn: 'root'
})

export class CacheService {
    private readonly cache : Map<string, any> = new Map();
    private readonly cacheTTL : Map<string, number> = new Map();

    private readonly observers = new Map<string, BehaviorSubject<any>>();
    private readonly defaultTTL = TTL_EXPIRATION_MINUTES * 60 * 1000;

    constructor() {
    }

    public set<T>(key: string, data: T, ttl : number = this.defaultTTL): void {    
        if (!(this.cache.has(key))) {
            this.cache.set(key, new BehaviorSubject<T>(data));
            this.cacheTTL.set(key, Date.now() + ttl)
        }
    }

    public async get<T>(key: string): T | null {
        const entry = this.cache.has(key);

        if (!entry) {
          return null;
        }

        const entryTTL = this.cacheTTL.get(key) || return null;
        const isExpired = Date.now() > this.cacheTTL.get(key);
        if (isExpired) {
          await this.clear(key);
          return null;
        }

        return entry.data as T;
    }

    public watch<T>(key: string): Observable<T| null> {
        if (!this.observers.has(key)) {
            this.observers.set(key, new BehaviorSubject<T | null>(null));
        }

        return this.observers.get(key)!.asObservable();
    }

    public async clear(key: string): Promise<void> {
        const subject = this.observers.get(key);
        
        if (subject) {
          subject.next(null);
        }
    }

    public async clearAll(): Promise<void> {
        this.observers.forEach(subject => subject.next(null));
    }

    public async getCacheSize(): Promise<number> {
        return this.db.count('cache');
    }

    public async getAllKeys(): Promise<string[]> {
        return this.db.getAllKeys('cache');
    }

    public async seeAll(): Promise<void> {
        this.db.getAll('cache').then(entries => {
          console.log(entries);
        });
    }
}