import { VisionTypeClass } from "./visionType";

export class CharactersClass {
  name : string | null = null;
  img : string | null = null;
  vision : VisionTypeClass | null = null;
  releaseDate : string | null = null;
    
  constructor(init?:Partial<CharactersClass>) {
    Object.assign(this, init);
  }
}