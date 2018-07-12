import {Component, OnInit} from '@angular/core';
import {CfImage} from '../models/cf-image';
import {ItemsService} from '../items.service';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent implements OnInit {

  images = Array<CfImage>();
  itemsService: ItemsService;

  constructor(itemsService: ItemsService) {
    this.itemsService = itemsService;
    if (!this.itemsService.currentItem.images) {
      this.itemsService.currentItem.images = [];
    }
  }

  ngOnInit() {
    this.images = this.itemsService.currentItem.images;
  }

  getPic($event: any): void {
    const file = $event.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.addEventListener(
      'load',
      () => {
        this.itemsService.currentItem.images.push(new CfImage(file.name, file.type, reader.result,file));
      },
      false);
  }

  public removeImage(index: number): void {
    this.itemsService.currentItem.images.splice(index, 1);
  }
}
