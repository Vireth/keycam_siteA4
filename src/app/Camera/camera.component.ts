import {Component} from '@angular/core';
import {SnackBar} from '../Information/snack-bar';

@Component({
  selector: 'app-camera',
  providers: [SnackBar],
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent {
  constructor() {}
}
