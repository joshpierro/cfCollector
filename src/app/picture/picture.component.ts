import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent implements OnInit {

  private player:any;
  private canvas:any;
  private context:any;

  constructor() { }

  ngOnInit() {
    this.player = document.getElementById('player');
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');

    const constraints = { video: { facingMode: { exact: "environment" } } };

    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        this.player.srcObject = stream;
      });

  }

  takePicture(){
    this.context.drawImage(this.player, 0, 0, this.canvas.width, this.canvas.height);
  }

}
