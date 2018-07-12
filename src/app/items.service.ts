import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from 'angularfire2/firestore';

import { Observable } from 'rxjs';

import { Item } from './Item/Item';


@Injectable()
export class ItemsService {

  currentItem: Item;
  itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<Item[]>;

  constructor(private afs: AngularFirestore) {
    if (!this.currentItem) {
      this.currentItem = new Item();
    }

    this.itemsCollection = afs.collection<Item>('items');
    this.getItems();
  }

  getItems(): void {
    this.items = this.itemsCollection.valueChanges();
    this.items.subscribe(response => {
      console.log(response);
    });
  }

  save(item: Item): Promise<DocumentReference> {
    const payload = this.transformItemPayload(item);
    return this.itemsCollection.add(payload);
  }

  private transformItemPayload(item: Item) {
    const payload = {};
    Object.keys(item)
      .forEach(property => {
        if (item[property]) {
          payload[property] = item[property];
        }
      });
    return payload;
  }

}
