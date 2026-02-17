import { Injectable } from "@angular/core"
import { ProjectClass } from "../../classes/class";

@Injectable({
  providedIn: 'root'
})
export class NationMapper {
    constructor() {}

    public mapRemote(nationKey: ProjectClass.Remote.NationType): ProjectClass.Local.NationType {
        try {
            switch(nationKey) {
                case ProjectClass.Remote.NationTypeList.MONDSTADT:
                    return ProjectClass.Local.NationTypeList.MONDSTADT;
                case ProjectClass.Remote.NationTypeList.LIYUE:
                    return ProjectClass.Local.NationTypeList.LIYUE;
                case ProjectClass.Remote.NationTypeList.INAZUMA:
                    return ProjectClass.Local.NationTypeList.INAZUMA;
                case ProjectClass.Remote.NationTypeList.SUMERU:
                    return ProjectClass.Local.NationTypeList.SUMERU;
                case ProjectClass.Remote.NationTypeList.FONTAINE:
                    return ProjectClass.Local.NationTypeList.FONTAINE;
                case ProjectClass.Remote.NationTypeList.NATLAN:
                    return ProjectClass.Local.NationTypeList.NATLAN;
                case ProjectClass.Remote.NationTypeList.NODKRAI:
                    return ProjectClass.Local.NationTypeList.NODKRAI;
                case ProjectClass.Remote.NationTypeList.OTHER:
                    return ProjectClass.Local.NationTypeList.OTHER;
                default:
                    throw ProjectClass.Local.NationTypeList.OTHER;
            }
        } catch (error) {
            console.error("Error mapping nation: ", error);
            return ProjectClass.Local.NationTypeList.OTHER;
        }
    }
}
