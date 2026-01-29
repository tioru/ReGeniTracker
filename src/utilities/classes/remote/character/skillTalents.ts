import { AttributeScalingClass } from "./attributeScaling";
import { UpgradeClass } from "./upgrade";

export class SkillTalentsClass {
  name : string | null = null;
  unlock : string | null = null;
  description : string | null = null;
  upgrades : Array<UpgradeClass> = [];
  type : string | null = null;
  "attribute-scaling" : Array<AttributeScalingClass> = [];

  constructor(init?:Partial<SkillTalentsClass>) {
    Object.assign(this, init);
  }
}