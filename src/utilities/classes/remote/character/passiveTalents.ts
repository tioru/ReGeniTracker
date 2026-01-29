export class PassiveTalentsClass {
  name : string | null = null;
  unlock : string | null = null;
  description : string | null = null;
  level : number | null = null;

  constructor(init?:Partial<PassiveTalentsClass>) {
    Object.assign(this, init);
  }
}