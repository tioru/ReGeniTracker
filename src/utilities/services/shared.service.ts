import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private readonly router: Router) {}
  
  public goTo(route: string, params?: string[]) {
    let finalRoute = route;
    
    if (params && params.length > 0) {
      params.forEach(param => {
        finalRoute = finalRoute.replace(/:[^/]+/, param);
      });
    }

    this.router.navigateByUrl(finalRoute);
  }

  public getArray(n: number): number[] {
    return new Array(n).fill(0).map((_, i) => i);
  }
}