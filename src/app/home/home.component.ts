import {Component, OnInit, Inject} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  quagga:any;


  constructor(@Inject('Quagga') quagga: any) {
    this.quagga = quagga;
  }

  ngOnInit() {
    this.quagga.init({
      inputStream : {
        name : "Live",
        type : "LiveStream",
        target: document.querySelector('#cf-scan-preview')
      },
      decoder : {
        readers : ["code_128_reader"]
      }
    },(err)=>{
      if (err) {
        console.log(err);
        return
      }
      console.log("Initialization finished. Ready to start");
      this.quagga.start();
    });

/*    this.quagga.onProcessed((result)=>{
      console.log(result);
    })*/


    this.quagga.onDetected((result)=>{
      console.log(result);
      alert('hey-o')
    })
  }

  quaggaStop(){
    this.quagga.stop();
  }

}
