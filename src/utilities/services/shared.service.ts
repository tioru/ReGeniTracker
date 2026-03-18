import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private readonly router: Router) {}

  public constructUrl(route: string, params?: string[]) : string {
    let finalRoute = route;
    
    if (params && params.length > 0) {
      params.forEach(param => {
        finalRoute = finalRoute.replace(/:[^/]+/, param);
      });
    }

    return "/" + finalRoute;
  }
  
  public goTo(route: string, params?: string[]) {
    this.router.navigateByUrl(this.constructUrl(route, params));
  }

  public getArray(n: number): number[] {
    return new Array(n).fill(0).map((_, i) => i);
  }
}