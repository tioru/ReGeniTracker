import { Injectable } from "@angular/core"
import { ProjectClass } from "../../classes/class"

@Injectable({
  providedIn: 'root'
})
export class PassiveTalentsMapper {
    constructor() {}

    public mapRemoteArray(rPassiveTalentsArray : ProjectClass.Remote.PassiveTalents[]) : ProjectClass.Local.PassiveTalents[] {
        return rPassiveTalentsArray.map((rPassiveTalents : ProjectClass.Remote.PassiveTalents) => {
            return this.mapRemote(rPassiveTalents)
        })
    }

    public mapRemote(rPassiveTalents : ProjectClass.Remote.PassiveTalents) : ProjectClass.Local.PassiveTalents {
        try {
            return new ProjectClass.Local.PassiveTalents({
                name : rPassiveTalents.name,
                unlock : rPassiveTalents.unlock,
                description : rPassiveTalents.description,
                level : rPassiveTalents.level,
            })
        } catch (error) {
          throw new Error("Error mapping Remote PassiveTalents to Local PassiveTalents  : " + error);
        }
    }
}