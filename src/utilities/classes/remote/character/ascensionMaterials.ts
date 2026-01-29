export class AscentionMaterialsClass {
  name : string | null = null;
  value : number | null = null;
  
  constructor(init?:Partial<AscentionMaterialsClass>) {
    Object.assign(this, init);
  }
}