import { SkillTalentsClass } from "./skillTalents"
import { ConstellationClass } from "./constellations"
import { AscentionMaterialsClass } from "./ascensionMaterials"
import { VisionTypeClass } from "./visionType"
import { PassiveTalentsClass } from "./passiveTalents";

export class CharacterClass {
  name : string | null = null;
  title : string | null = null;
  vision : VisionTypeClass | null = null;
  weapon : string | null = null;
  gender : string | null = null;
  nation : string | null = null;
  affiliation : string | null = null;
  rarity : number | null = null;
  releaseDate : string | null = null;
  constellation : string | null = null;
  birthday : string | null = null;
  description : string | null = null;
  skillTalents : Array<SkillTalentsClass> = [];
  passiveTalents : Array<PassiveTalentsClass> = [];
  constellations : Array<ConstellationClass> = [];
  weaponType : string | null = null;
  ascensionMaterials : {
    level20 : AscentionMaterialsClass[]
    level40 : AscentionMaterialsClass[]
    level50 : AscentionMaterialsClass[]
    level60 : AscentionMaterialsClass[]
    level70 : AscentionMaterialsClass[]
    level80 : AscentionMaterialsClass[]
  } | null = null;
  id : string | null = null;

  constructor(init?:Partial<CharacterClass>) {
    Object.assign(this, init);
  }
}