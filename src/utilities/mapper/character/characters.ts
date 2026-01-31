import { Injectable } from "@angular/core";
import { ProjectClass } from "../../classes/class";
import { VisionTypeMapper } from "./visionType";

@Injectable({
  providedIn: 'root'
})
export class CharactersMapper {
    constructor(
        public visionTypeMapper : VisionTypeMapper
    ) {}

    public mapRemoteToLocalArray(charactersArray : ProjectClass.Remote.Characters[]) : ProjectClass.Local.Characters[] {
        return charactersArray.map(characters => this.mapRemote(characters));
    }

    public mapRemote(characters : ProjectClass.Remote.Characters) : ProjectClass.Local.Characters {
        try {
            return new ProjectClass.Local.Characters({
                  name : characters.name,
                  gachaSplash : characters.gachaSplash,
                  vision : characters.vision_key ? this.visionTypeMapper.mapRemote(characters.vision_key) : null,
                  releaseDate : characters.release,
              })
        } catch (error) {
            console.log(characters)
          throw new Error("Error mapping Remote Characters to Local Characters  : " + error);
        }
    }
}