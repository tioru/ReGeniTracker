import { LAscentionMaterialsClass } from "./local/character/ascensionMaterials";
import { LAttributeScalingClass } from "./local/character/attributeScaling";
import { LCharacterClass } from "./local/character/character";
import { LCharacterArtsClass } from "./local/character/characterArt";
import { LCharacterArtsArray, LCharacterArtsTypeClass, LCharacterArtsTypeListEnum } from "./local/character/characterArtsType";
import { LCharacterListingClass } from "./local/character/charactersListing";
import { LConstellationClass } from "./local/character/constellations";
import { LPassiveTalentsClass } from "./local/character/passiveTalents";
import { LSkillTalentsClass } from "./local/character/skillTalents";
import { LUpgradeClass } from "./local/character/upgrade";
import { LVisionTypeClass, LVisionTypeListEnum } from "./local/character/visionType";
import { LWeaponClass } from "./local/weapon/weapon";
import { LWeaponListingClass } from "./local/weapon/weaponsListing";
import { RAscentionMaterialsClass } from "./remote/character/ascensionMaterials";
import { RAttributeScalingClass } from "./remote/character/attributeScaling";

import { RCharacterClass } from "./remote/character/character";
import { RCharacterArtsClass } from "./remote/character/characterArt";
import { RCharacterArtsArray, RCharacterArtsTypeClass, RCharacterArtsTypeListEnum } from "./remote/character/characterArtsType";
import { RCharacterListingClass } from "./remote/character/charactersListing";
import { RConstellationClass } from "./remote/character/constellations";
import { RPassiveTalentsClass } from "./remote/character/passiveTalents";
import { RSkillTalentsClass } from "./remote/character/skillTalents";
import { RUpgradeClass } from "./remote/character/upgrade";
import { RVisionTypeClass, RVisionTypeListEnum } from "./remote/character/visionType";
import { RWeaponClass } from "./remote/weapon/weapon";
import { RWeaponListingClass } from "./remote/weapon/weaponsListing";

export namespace ProjectClass {
    export namespace Local {
        export class Character extends LCharacterClass{};
        export class CharacterListing extends LCharacterListingClass{};
        export class CharacterArts extends LCharacterArtsClass{};
        export const CharacterArtsArray = LCharacterArtsArray;
        export type CharacterArtsType = LCharacterArtsTypeClass;
        export type CharacterArtsTypeList = LCharacterArtsTypeListEnum;
        export type VisionType = LVisionTypeClass;
        export import VisionTypeList = LVisionTypeListEnum;
        export class SkillTalents extends LSkillTalentsClass{};
        export class Upgrade extends LUpgradeClass{};
        export class AttributeScaling extends LAttributeScalingClass{};
        export class PassiveTalents extends LPassiveTalentsClass{};
        export class Constellation extends LConstellationClass{};
        export class AscentionMaterials extends LAscentionMaterialsClass{};
        export class WeaponListing extends LWeaponListingClass{};
        export class Weapon extends LWeaponClass{};
    }

    export namespace Remote {
        export class Character extends RCharacterClass{};
        export class CharacterListing extends RCharacterListingClass{};
        export class CharacterArts extends RCharacterArtsClass{};
        export const CharacterArtsArray = RCharacterArtsArray;
        export type CharacterArtsType = RCharacterArtsTypeClass;
        export type CharacterArtsTypeList = RCharacterArtsTypeListEnum;
        export type VisionType = RVisionTypeClass;
        export import VisionTypeList = RVisionTypeListEnum;
        export class SkillTalents extends RSkillTalentsClass{};
        export class Upgrade extends RUpgradeClass{};
        export class AttributeScaling extends RAttributeScalingClass{};
        export class PassiveTalents extends RPassiveTalentsClass{};
        export class Constellation extends RConstellationClass{};
        export class AscentionMaterials extends RAscentionMaterialsClass{};
        export class WeaponListing extends RWeaponListingClass{};
        export class Weapon extends RWeaponClass{};
    }
}