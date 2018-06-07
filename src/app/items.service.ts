import {Injectable} from '@angular/core';
import {Item} from './Item/Item';

@Injectable()
export class ItemsService {

  currentItem: Item;

  constructor() {
    if (!this.currentItem) {
      this.currentItem = new Item();
    }
  }

}
