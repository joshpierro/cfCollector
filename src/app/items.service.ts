import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';

import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { Item } from './Item/Item';
import { CfImage } from './models/cf-image';
import { UploadTaskSnapshot } from 'angularfire2/storage/interfaces';


@Injectable()
export class ItemsService {

  currentItem: Item;
  isSaving = false;
  itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<Item[]>;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage) {
    if (!this.currentItem) {
      this.currentItem = new Item();
    }
    this.itemsCollection = afs.collection<Item>('items');
  }

  getItems(): void {
    this.items = this.itemsCollection.valueChanges();
    this.items.subscribe(response => {
      console.log(response);
    });
  }

  save(item: Item): Promise<DocumentReference> {
    this.isSaving = true; 
    const task = this.saveItem(item);
    task.then(response => this.saveImages(response));
    return task;
  }

  saveImages(newItem: DocumentReference): void {
    if (!this.currentItem.images) {
      this.resetItem();
      return;
    }

    const images:Array<string> = new Array<string>(); 

    let imageCount = this.currentItem.images.length; 
    this.currentItem.images.forEach(image => {
      const fileName = `${newItem.id}${image.name}`;
      const fileRef = this.storage.ref(fileName);
      const task = this.storage.upload(fileName, image.file);

      task.snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL()
              .subscribe(url => {
                images.push(url);
                if (images.length === imageCount) {
                  this.updateItemWithImagePath(images,newItem);
                }
              })
          })
        ).subscribe()
      
    });
  }

  private saveItem(item: Item) {
    const payload = this.transformItemPayload(item);
    return this.itemsCollection.add(payload);
  }

  private removeImagesFromPayload(payload: any): void {
    if (payload.images) {
      delete payload.images;
    }
  }

  resetItem():void{
    this.currentItem = new Item();
    this.isSaving = false; 
  }

  private transformItemPayload(item: Item): any {
    const payload = {};
    Object.keys(item)
      .forEach(property => {
        if (item[property]) {
          payload[property] = item[property];
        }
      });
    this.removeImagesFromPayload(payload);
    return payload;
  }

  private updateItemWithImagePath(images:Array<string>, newItem: DocumentReference): void {
    const itemDocument = this.afs.doc<Item>(newItem.path);
    itemDocument.valueChanges()
    .subscribe(result=>{
     result.imageUrls = images; 
     itemDocument.update(result)
     .then(result=>{
       this.resetItem();
     });
    });
  }
}
