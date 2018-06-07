import {CfImage} from '../models/cf-image';

export class Item {
  code: string;
  title: string;
  description: string;
  images: Array<CfImage>;
}
