import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private readonly router: Router) {}
  
  public goTo(route: string, newTab : boolean = false, params?: string[]) { 
    const finalRoute = this.router.createUrlTree([route === '' ? '/' : route, params])

    console.log(finalRoute)
    if (newTab) {
      window.open(finalRoute.toString(), '_blank')
    } else {
      this.router.navigate([finalRoute]);
    }
  }

  public getArray(n: number): number[] {
    return new Array(n).fill(0).map((_, i) => i);
  }
}