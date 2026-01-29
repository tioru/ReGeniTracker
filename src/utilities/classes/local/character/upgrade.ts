export class UpgradeClass {
  name : string | null = null;
  value : string | null = null;

  constructor(init?:Partial<UpgradeClass>) {
    Object.assign(this, init);
  }
}