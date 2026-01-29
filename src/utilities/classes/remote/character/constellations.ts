export class ConstellationClass {
  name : string | null = null;
  unlock : string | null = null;
  description : string | null = null;
  level : number | null = null;

  constructor(init?:Partial<ConstellationClass>) {
    Object.assign(this, init);
  }
}