export class WeaponListingClass {
  name : string | null = null;
  icon : string | null = null;
  rarity : number | null = null;
    
  constructor(init?:Partial<WeaponListingClass>) {
    Object.assign(this, init);
  }
}