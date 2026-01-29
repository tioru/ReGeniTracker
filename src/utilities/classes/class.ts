import { AscentionMaterialsClass as LocalAscentionMaterialsClass } from "./local/character/ascensionMaterials";
import { AttributeScalingClass as LocalAttributeScalingClass } from "./local/character/attributeScaling";
import { CharacterClass as LocalCharacterClass } from "./local/character/character";
import { CharacterArtsClass as LocalCharacterArtsClass } from "./local/character/characterArt";
import { CharacterArtsArray as LocalCharacterArtsArray, CharacterArtsTypeClass as LocalCharacterArtsTypeClass, CharacterArtsTypeListEnum as LocalCharacterArtsTypeListEnum } from "./local/character/characterArtsType";
import { CharacterListingClass as LocalCharacterListingClass } from "./local/character/charactersListing";
import { ConstellationClass as LocalConstellationClass } from "./local/character/constellations";
import { PassiveTalentsClass as LocalPassiveTalentsClass } from "./local/character/passiveTalents";
import { SkillTalentsClass as LocalSkillTalentsClass } from "./local/character/skillTalents";
import { UpgradeClass as LocalUpgradeClass } from "./local/character/upgrade";
import { VisionTypeClass as LocalVisionTypeClass, VisionTypeListEnum as LocalVisionTypeListEnum } from "./local/character/visionType";
import { WeaponClass as LocalWeaponClass } from "./local/weapon/weapon";
import { WeaponListingClass as LocalWeaponListingClass } from "./local/weapon/weaponsListing";

import { AscentionMaterialsClass as RemoteAscentionMaterialsClass } from "./remote/character/ascensionMaterials";
import { AttributeScalingClass as RemoteAttributeScalingClass } from "./remote/character/attributeScaling";
import { CharacterClass as RemoteCharacterClass } from "./remote/character/character";
import { CharacterArtsClass as RemoteCharacterArtsClass } from "./remote/character/characterArt";
import { CharacterArtsArray as RemoteCharacterArtsArray, CharacterArtsTypeClass as RemoteCharacterArtsTypeClass, CharacterArtsTypeListEnum as RemoteCharacterArtsTypeListEnum } from "./remote/character/characterArtsType";
import { CharacterListingClass as RemoteCharacterListingClass } from "./remote/character/charactersListing";
import { ConstellationClass as RemoteConstellationClass } from "./remote/character/constellations";
import { PassiveTalentsClass as RemotePassiveTalentsClass } from "./remote/character/passiveTalents";
import { SkillTalentsClass as RemoteSkillTalentsClass } from "./remote/character/skillTalents";
import { UpgradeClass as RemoteUpgradeClass } from "./remote/character/upgrade";
import { VisionTypeClass as RemoteVisionTypeClass, VisionTypeListEnum as RemoteVisionTypeListEnum } from "./remote/character/visionType";
import { WeaponClass as RemoteWeaponClass } from "./remote/weapon/weapon";
import { WeaponListingClass as RemoteWeaponListingClass } from "./remote/weapon/weaponsListing";

export namespace ProjectClass {
    export namespace Local {
        export class Character extends LocalCharacterClass {};
        export class CharacterListing extends LocalCharacterListingClass {};
        export class CharacterArts extends LocalCharacterArtsClass {};
        export const CharacterArtsArray = LocalCharacterArtsArray;
        export type CharacterArtsType = LocalCharacterArtsTypeClass;
        export type CharacterArtsTypeList = LocalCharacterArtsTypeListEnum;
        export type VisionType = LocalVisionTypeClass;
        export import VisionTypeList = LocalVisionTypeListEnum;
        export class SkillTalents extends LocalSkillTalentsClass {};
        export class Upgrade extends LocalUpgradeClass {};
        export class AttributeScaling extends LocalAttributeScalingClass {};
        export class PassiveTalents extends LocalPassiveTalentsClass {};
        export class Constellation extends LocalConstellationClass {};
        export class AscentionMaterials extends LocalAscentionMaterialsClass {};
        export class WeaponListing extends LocalWeaponListingClass {};
        export class Weapon extends LocalWeaponClass {};
    }

    export namespace Remote {
        export class Character extends RemoteCharacterClass {};
        export class Characters extends RemoteCharacterListingClass {};
        export class CharacterArts extends RemoteCharacterArtsClass {};
        export const CharacterArtsArray = RemoteCharacterArtsArray;
        export type CharacterArtsType = RemoteCharacterArtsTypeClass;
        export type CharacterArtsTypeList = RemoteCharacterArtsTypeListEnum;
        export type VisionType = RemoteVisionTypeClass;
        export import VisionTypeList = RemoteVisionTypeListEnum;
        export class SkillTalents extends RemoteSkillTalentsClass {};
        export class Upgrade extends RemoteUpgradeClass {};
        export class AttributeScaling extends RemoteAttributeScalingClass {};
        export class PassiveTalents extends RemotePassiveTalentsClass {};
        export class Constellation extends RemoteConstellationClass {};
        export class AscentionMaterials extends RemoteAscentionMaterialsClass {};
        export class WeaponListing extends RemoteWeaponListingClass {};
        export class Weapon extends RemoteWeaponClass {};
    }
}