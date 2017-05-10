import { Component } from '@angular/core';
import {KeycamService} from './Service/keycam.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
  other;

  constructor(private keycamService: KeycamService) {
    this.keycamService.team()
      .then(response => this.other = response);
  }
}
