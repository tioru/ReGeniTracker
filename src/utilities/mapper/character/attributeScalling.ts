import { Injectable } from "@angular/core";
import { ProjectClass } from "../../classes/class";

@Injectable({
  providedIn: 'root'
})
export class AttributeScallingMapper {
    constructor() {}

    public mapRemoteArray(rAttributeScallingArray : ProjectClass.Remote.AttributeScaling[]) : ProjectClass.Local.AttributeScaling[] {
        return rAttributeScallingArray.map((rAttributeScalling) => {
            return this.mapRemote(rAttributeScalling)
        })
    }

    public mapRemote(rAttributeScalling : ProjectClass.Remote.AttributeScaling) : ProjectClass.Local.AttributeScaling {
        try {
            return new ProjectClass.Local.AttributeScaling({
                name : rAttributeScalling.name,
                value : rAttributeScalling.value
            })
        } catch (error) {
          throw new Error("Error mapping Remote AttributeScaling to Local AttributeScaling  : " + error);
        }
    }
}