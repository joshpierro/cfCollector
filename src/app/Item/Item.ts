import { CfImage } from '../models/cf-image';

export class Item {
  code: string;
  title: string;
  description: string;
  images: Array<any>;
  imageUrls:Array<string>;

  constructor(){
    this.imageUrls = new Array<string>(); 
  }

  canSave(): boolean {
    if (this.title && this.description) {
      return true;
    } else {
      return false;
    }
  }
}
