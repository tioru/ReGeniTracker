import { Injectable } from "@angular/core";
import { SkillTalentsMapper } from "./skillTalents";
import { PassiveTalentsMapper } from "./passiveTalents";
import { ConstellationsMapper } from "./constellations";
import { AscentionMaterialsMapper } from "./ascentionMaterials";
import { VisionTypeMapper } from "./visionType";
import { ProjectClass } from "../../classes/class";

@Injectable({
  providedIn: 'root'
})
export class CharacterMapper {
    constructor(
        public skillTalentsMapper : SkillTalentsMapper,
        public passiveTalentsMapper : PassiveTalentsMapper,
        public constellationsMapper : ConstellationsMapper,
        public ascentionMaterialsMapper : AscentionMaterialsMapper,
        public visionTypeMapper : VisionTypeMapper
    ) {}

    public mapRemoteArray(rCharacterArray : ProjectClass.Remote.Character[]) : ProjectClass.Local.Character[] {
        return rCharacterArray.map((rCharacter : ProjectClass.Remote.Character) => {
            return this.mapRemote(rCharacter)
        })
    }

    public mapRemote(character : ProjectClass.Remote.Character) : ProjectClass.Local.Character {
        try {
            return new ProjectClass.Local.Character({
                name : character.name,
                title : character.title,
                vision : character.vision_key ? this.visionTypeMapper.mapRemote(character.vision_key) : null,
                weapon : character.weapon,
                gender : character.gender,
                nation : character.nation,
                affiliation : character.affiliation,
                rarity : character.rarity,
                releaseDate : character.release,
                constellation : character.constellation,
                birthday : character.birthday,
                description : character.description,
                skillTalents : this.skillTalentsMapper.mapRemoteArray(character.skillTalents),
                passiveTalents : this.passiveTalentsMapper.mapRemoteArray(character.passiveTalents),
                constellations : this.constellationsMapper.mapRemoteArray(character.constellations),
                weaponType : character.weapon_type,
                ascensionMaterials : {
                    level20 : character.ascension_materials?.level20 ? this.ascentionMaterialsMapper.mapRemoteArray(character.ascension_materials.level20) : [],
                    level40 : character.ascension_materials?.level40 ? this.ascentionMaterialsMapper.mapRemoteArray(character.ascension_materials.level40) : [],
                    level50 : character.ascension_materials?.level50 ? this.ascentionMaterialsMapper.mapRemoteArray(character.ascension_materials.level50) : [],
                    level60 : character.ascension_materials?.level60 ? this.ascentionMaterialsMapper.mapRemoteArray(character.ascension_materials.level60) : [],
                    level70 : character.ascension_materials?.level70 ? this.ascentionMaterialsMapper.mapRemoteArray(character.ascension_materials.level70) : [],
                    level80 : character.ascension_materials?.level80 ? this.ascentionMaterialsMapper.mapRemoteArray(character.ascension_materials.level80) : [],
                },
                id: character.id
            })
        } catch (error) {
          throw new Error("Error mapping Remote Character to Local Character  : " + error);
        }
    }
}