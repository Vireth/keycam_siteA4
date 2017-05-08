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

  sendText(f: NgForm) {
    if (f.valid === true) {
      this.socketService.sendText(f.value.message);
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
