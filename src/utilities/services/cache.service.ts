import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { openDB, IDBPDatabase, DBSchema } from 'idb';

interface CacheDB extends DBSchema {
  cache: {
    key: string;
    value: {
      data: any;
      timestamp: number;
    };
    indexes: { 'by-timestamp': number };
  };
}

const DB_NAME = 'AppCache';
const DB_VERSION = 1;
const TTL_EXPIRATION_MINUTES = 5;

@Injectable({
    providedIn: 'root'
})

export class CacheService {
    private db!: IDBPDatabase<CacheDB>;
    private readonly observers = new Map<string, BehaviorSubject<any>>();
    private readonly defaultTTL = TTL_EXPIRATION_MINUTES * 60 * 1000;
    private readonly dbReady: Promise<void>;

    constructor() {
        this.dbReady = this.initDB();
    }

    private async initDB(): Promise<void> {
        this.db = await openDB<CacheDB>(DB_NAME, DB_VERSION, {
            upgrade(db) {
                const store = db.createObjectStore('cache', { keyPath: 'key' });
                store.createIndex('by-timestamp', 'timestamp');
            }
        });
    }

    public async set<T>(key: string, data: T): Promise<void> {
        await this.dbReady;
        
        const entry = {
          key,
          data,
          timestamp: Date.now()
        };
        
        await this.db.put('cache', entry);
        
        if (this.observers.has(key)) {
            this.observers.get(key)!.next(data);
        } else {
            this.observers.set(key, new BehaviorSubject<T>(data));
        }
    }

    public async get<T>(key: string): Promise<T | null> {
        await this.dbReady;
        
        const entry = await this.db.get('cache', key);
        if (!entry) {
          return null;
        }

        const isExpired = Date.now() - entry.timestamp > this.defaultTTL;
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
        await this.dbReady;
        await this.db.delete('cache', key);
        
        const subject = this.observers.get(key);
        
        if (subject) {
          subject.next(null);
        }
    }

    public async clearAll(): Promise<void> {
        await this.dbReady;
        await this.db.clear('cache');

        this.observers.forEach(subject => subject.next(null));
    }

    public async getCacheSize(): Promise<number> {
        await this.dbReady;

        return this.db.count('cache');
    }

    public async getAllKeys(): Promise<string[]> {
        await this.dbReady;

        return this.db.getAllKeys('cache');
    }

    public async seeAll(): Promise<void> {
        await this.dbReady;

        this.db.getAll('cache').then(entries => {
          console.log(entries);
        });
    }
}