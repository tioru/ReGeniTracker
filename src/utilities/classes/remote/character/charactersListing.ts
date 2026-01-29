import { VisionTypeClass } from "./visionType";

export class CharacterListingClass {
  name : string | null = null;
  icon : string | null = null;
  vision : VisionTypeClass | null = null;
  release : string | null = null;
    
  constructor(init?:Partial<CharacterListingClass>) {
    Object.assign(this, init);
  }
}