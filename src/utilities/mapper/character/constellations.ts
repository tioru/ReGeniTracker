import { Injectable } from "@angular/core"
import { ProjectClass } from "../../classes/class"

@Injectable({
  providedIn: 'root'
})
export class ConstellationsMapper {
    constructor() {}

    public mapRemoteArray(rConstellationArray : ProjectClass.Remote.Constellation[]) : ProjectClass.Local.Constellation[] {
        return rConstellationArray.map((rConstellation : ProjectClass.Remote.Constellation) => {
            return this.mapRemote(rConstellation)
        })
    }

    public mapRemote(rConstellation : ProjectClass.Remote.Constellation) : ProjectClass.Local.Constellation {
        try {
            return new ProjectClass.Local.Constellation({
                name : rConstellation.name,
                unlock : rConstellation.unlock,
                description : rConstellation.description,
                level : rConstellation.level,
            })
        } catch (error) {
          throw new Error("Error mapping Remote Constellation to Local Constellation  : " + error);
        }
    }
}