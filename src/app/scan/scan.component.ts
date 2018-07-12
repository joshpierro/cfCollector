import {Component, OnInit, Inject} from '@angular/core';
import {ItemsService} from '../items.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {

  itemsService: ItemsService;
  router: Router;
  quagga: any;

  constructor(@Inject('Quagga') quagga: any, itemsService: ItemsService, router: Router) {
    this.router = router;
    this.quagga = quagga;
    this.itemsService = itemsService;
  }



  ngOnInit() {
   this.quagga.init({
      inputStream : {
        name : 'Live',
        type : 'LiveStream',
        target: document.querySelector('#cf-scan-preview')
      },
      decoder : {
        readers : ['code_128_reader']
      }
    }, (error) => {
      if (error) {
        alert('Error Getting Barcode');
        console.log(error)
        return;
      }
      this.quagga.start();
    });

    this.quagga.onDetected((result) => {
      this.quagga.stop();
      this.itemsService.currentItem.code = result.codeResult.code;
      this.router.navigateByUrl('');
    });
  }

}
