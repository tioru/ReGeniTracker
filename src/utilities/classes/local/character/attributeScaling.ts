export class AttributeScalingClass {
  name : string | null = null;
  value : string | null = null;

  constructor(init?:Partial<AttributeScalingClass>) {
    Object.assign(this, init);
  }
}