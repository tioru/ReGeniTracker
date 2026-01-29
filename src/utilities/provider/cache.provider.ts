import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class CacheProvider {
    private readonly observers = new Map<string, BehaviorSubject<any>>();


    constructor() {
    }

    public set<T>(key: string, data: T, ttl : number): void {
        localStorage.setItem(key, JSON.stringify(data));
        localStorage.setItem(`${key}_ttl`, (Date.now() + ttl).toString());
    }

    public get<T>(key: string): T | null {
        const entry = localStorage.getItem(key);
        const entryTTL = localStorage.getItem(`${key}_ttl`);

        if (!entry || !entryTTL) {
          return null;
        }

        const isExpired = Date.now() > Number.parseInt(entryTTL);
        if (isExpired) {
          this.clear(key);
          return null;
        }

        return JSON.parse(entry) as T;
    }

    public async clear(key: string): Promise<void> {
        const subject = this.observers.get(key);
        
        if (subject) {
          subject.next(null);
        }
    }

    public async clearAll(): Promise<void> {
        localStorage.clear();
    }

    public async getCacheSize(): Promise<number> {
        return localStorage.length;
    }

    public async getAllKeys(): Promise<string[]> {
        return Array.from({ length: localStorage.length }, (_, i) => localStorage.key(i)!);
    }

    public async seeAll(): Promise<void> {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key!);
            console.log(`Key: ${key}, Value: ${value}`);
        }
    }
}