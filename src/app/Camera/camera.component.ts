import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import {SnackBar} from '../Information/snack-bar';
import { SocketService } from '../Service/socket.service';
import { KeycamService } from '../Service/keycam.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-camera',
  providers: [SnackBar],
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})

export class CameraComponent implements OnInit, OnDestroy {

  private textConnect;
  private askPictureConnect;
  message123 = '';

  history = [
    {
      name: 'Vireth.com',
      updated: new Date('06/20/17'),
    }
  ];

  tiles = [
    {text: 'panel', cols: 1, rows: 3, color: 'lightblue'},
    {text: 'lights', cols: 2, rows: 3, color: 'lightgreen'},
    {text: 'options', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: 'history', cols: 1, rows: 5, color: 'lightpink'},
    {text: 'blank', cols: 3, rows: 1, color: '#DDBDF1'},
    {text: 'camera', cols: 2, rows: 3, color: 'lightblue'},
    {text: 'buttonCamera', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'buttonListen', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'buttonSpeak', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'messageSpeak', cols: 1, rows: 1, color: '#DDBDF1'}
  ];

  constructor(private socketService: SocketService,
              private KeycamService: KeycamService,
              private router: Router) {}

  ngOnInit() {
    this.textConnect = this.socketService.getText().subscribe(text => {
      console.log(text);
    });
    this.askPictureConnect = this.socketService.getPicture().subscribe(data => {
      console.log(data);
    });
  }

  sendText() {
    if (this.message123 !== '') {
      const test = {
        name: 'Take a picture',
        updated: new Date('05/09/17'),
      };
      this.history.push(test);
      this.socketService.sendText(this.message123);
    }
  }

  askPicture() {
    this.socketService.askPicture();
  }

  ngOnDestroy() {
    this.askPictureConnect.unsubscribe();
    this.textConnect.unsubscribe();
    this.socketService.deconnect();
  }

}
