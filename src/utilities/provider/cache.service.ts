import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class CacheService {
    private readonly cache : Map<string, any> = new Map();
    private readonly cacheTTL : Map<string, number> = new Map();

    private readonly observers = new Map<string, BehaviorSubject<any>>();


    constructor() {
    }

    public set<T>(key: string, data: T, ttl : number): void {    
        if (!(this.cache.has(key))) {
            this.cache.set(key, new BehaviorSubject<T>(data));
            this.cacheTTL.set(key, Date.now() + ttl)
        }
    }

    public get<T>(key: string): T | null {
        const entry = this.cache.get(key);
        const entryTTL = this.cacheTTL.get(key);

        if (!entry || !entryTTL) {
          return null;
        }

        const isExpired = Date.now() > entryTTL;
        if (isExpired) {
          this.clear(key);
          return null;
        }

        return entry as T;
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
        return this.cache.size;
    }

    public async getAllKeys(): Promise<string[]> {
        return Array.from(this.cache.keys());
    }

    public async seeAll(): Promise<void> {
        this.cache.forEach((value, key) => {
          console.log(key, value);
        });
    }
}