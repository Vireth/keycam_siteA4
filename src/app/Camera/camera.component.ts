import {Component} from '@angular/core';
import { Router } from '@angular/router';
import {SnackBar} from '../Information/snack-bar';
import { SocketService } from '../Service/socket.service';
import { KeycamService } from '../Service/keycam.service';

@Component({
  selector: 'app-camera',
  providers: [SnackBar],
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent {
  
  constructor(private socketService: SocketService, private KeycamService: KeycamService, private router: Router) {

  }
}
