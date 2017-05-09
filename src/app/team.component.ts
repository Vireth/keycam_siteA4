import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
  private url = 'http://10.0.1.6:3333/api/team/';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  other: any[] = [
    {
      'person': [
        {
          'name': 'Victoria Hjalmarsson',
          'img': 'victoria.png',
          'student_id': '16920035',
          'role': 'Project manager'
        },
        {
          'name': 'Simon Menard',
          'img': 'keysim.png',
          'student_id': '16129161',
          'role': 'Dev Web Site and API'
        },
      ]
    },
    {
      'person': [
        {
          'name': 'Maxime Lamarthe',
          'img': 'maxime.png',
          'student_id': '16129095',
          'role': 'Dev Web Site'
        },
        {
          'name': 'Jean-Luc Tang',
          'img': 'tang.png',
          'student_id': '16129131',
          'role': 'Dev Android'
        },
        {
          'name': 'Vireth Thach sok',
          'img': 'vireth.png',
          'student_id': '16129114',
          'role': 'Dev Android'
        }
      ]
    },
    {
      'person': [
        {
          'name': 'Youh Iddahamou',
          'img': 'youh.png',
          'student_id': '16129157',
          'role': 'Dev streaming video'
        },
        {
          'name': 'Aymeric Gand',
          'img': 'aymeric.png',
          'student_id': '16129137',
          'role': 'Dev streaming video'
        }
      ]
    }
  ];

  constructor(private http: Http) {
    this.http.post(this.url, null, { headers: this.headers })
      .toPromise()
      .then(data => data.json())
      .catch(data => false);
  }
}
