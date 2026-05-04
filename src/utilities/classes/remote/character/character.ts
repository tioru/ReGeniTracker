import { SkillTalentsClass } from "./skillTalents"
import { PassiveTalentsClass } from "./passiveTalents"
import { ConstellationClass } from "./constellations"
import { AscentionMaterialsClass } from "./ascensionMaterials"
import { VisionTypeClass } from "./visionType"
import { NationTypeClass } from "./nation"

export class CharacterClass {
  name : string | null = null;
  title : string | null = null;
  vision : VisionTypeClass | null = null;
  weapon : string | null = null;
  gender : string | null = null;
  nation : NationTypeClass | null = null;
  affiliation : string | null = null;
  rarity : number | null = null;
  release : string | null = null;
  constellation : string | null = null;
  birthday : string | null = null;
  description : string | null = null;
  skillTalents : Array<SkillTalentsClass> = [];
  passiveTalents : Array<PassiveTalentsClass> = [];
  constellations : Array<ConstellationClass> = [];
  vision_key : VisionTypeClass | null = null;
  weapon_type : string | null = null;
  ascension_materials : {
    level_20 : AscentionMaterialsClass[]
    level_40 : AscentionMaterialsClass[]
    level_50 : AscentionMaterialsClass[]
    level_60 : AscentionMaterialsClass[]
    level_70 : AscentionMaterialsClass[]
    level_80 : AscentionMaterialsClass[]
  } | null = null;
  id : string | null = null;

  constructor(init?:Partial<CharacterClass> ) {
    Object.assign(this, init);
  }
}