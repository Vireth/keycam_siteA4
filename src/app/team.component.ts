import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {KeycamService} from './Service/keycam.service';
import 'rxjs/add/operator/toPromise';
import {parseHttpResponse} from 'selenium-webdriver/http';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
  // private url = 'http://10.0.1.6:3333/api/teams';
  // private headers = new Headers({ 'Content-Type': 'application/json' });
  // other;
  //
  // constructor(private keycamService: KeycamService) {
  //   this.http.get(this.url, { headers: this.headers })
  //     .toPromise()
  //     .then(data => this.other = data.json());
  // }

  other;

  constructor(private keycamService: KeycamService) {
    this.keycamService.team()
      .then(response => this.other = response);
  }
}
