import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export const CACHE_EXPIRATION_MINUTES = 5;

@Injectable({
    providedIn: 'root'
})

export class CacheService {
    private cache = new Map<string, CacheEntry<any>>();

    private subjects = new Map<string, BehaviorSubject<any>>();
    private readonly defaultTTL = CACHE_EXPIRATION_MINUTES * 60 * 1000;

    public set<T>(key : string, data : T, ttl: number = this.defaultTTL): void {
        this.cache.set(key, {data : data, timestamp : Date.now(), ttl : ttl});

        if (!this.subjects.has(key)) {
            this.subjects.set(key, new BehaviorSubject<T>(data))
        } else {
            const subject = this.subjects.get(key);
            subject ? subject.next(data) : console.log("Error")
        }
    }
}