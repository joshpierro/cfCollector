import { Component, OnInit } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { Item } from '../Item/Item';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  itemsService: ItemsService;
  quagga: any;

  constructor(itemsService: ItemsService) {
    this.itemsService = itemsService;
  }

  ngOnInit() { }

  saveItem(): void {
    this.itemsService
      .save(this.itemsService.currentItem)
      .then(response => {
         // this.itemsService.resetItem();
      });
  }
}
