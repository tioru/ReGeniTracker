import { VisionTypeClass } from "./visionType";

export class CharactersClass {
  name : string | null = null;
  gachaSplash : string | null = null;
  vision_key : VisionTypeClass | null = null;
  release : string | null = null;
    
  constructor(init?:Partial<CharactersClass>) {
    Object.assign(this, init);
  }
}