import { Injectable } from "@angular/core";
import { UpgradesMapper } from "./upgrades";
import { AttributeScallingMapper } from "./attributeScalling";
import { ProjectClass } from "../../classes/class";

@Injectable({
  providedIn: 'root'
})
export class SkillTalentsMapper {
    constructor(
        public upgradesMapper : UpgradesMapper,
        public attributeScallingMapper : AttributeScallingMapper
    ) {}

    public mapRemoteArray(rSkillTalentsArray : ProjectClass.Remote.SkillTalents[]) : ProjectClass.Local.SkillTalents[] {
        return rSkillTalentsArray.map((rSkillTalents : ProjectClass.Remote.SkillTalents) => {
            return this.mapRemote(rSkillTalents)
        })
    }

    public mapRemote(rSkillTalents : ProjectClass.Remote.SkillTalents) : ProjectClass.Local.SkillTalents {
        try {
            return new ProjectClass.Local.SkillTalents({
                name : rSkillTalents.name,
                unlock : rSkillTalents.unlock,
                description : rSkillTalents.description,
                upgrades : rSkillTalents.upgrades ? this.upgradesMapper.mapRemoteArray(rSkillTalents.upgrades) : [],
                type : rSkillTalents.type,
                attributeScaling : rSkillTalents["attribute-scaling"] ? this.attributeScallingMapper.mapRemoteArray(rSkillTalents["attribute-scaling"]) : []
            })
        }
        catch (error) {
            throw new Error("Error mapping Remote SkillTalents to Local SkillTalents  : " + error);
        }
    }
}