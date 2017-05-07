import { Component } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  template: `
  <h1 style="text-align: center">Our team group</h1>
  <br>
  <div class="row center" *ngFor="let group of data">
    <div *ngFor="let person of group.person" class="card">
      <div class="header-bg">
        <h3>{{person.name}}</h3>
      </div>
      <div class="avatar">
        <img src="{{'../assets/team/' + person.img}}" alt="keysim" />
      </div>
      <p class="card-desc">{{person.student_id}}<br>{{person.role}}</p>
    </div>
  </div>
 `    
})
export class TeamComponent {
  data: any[] = [
    {
      'team': 'web',
      'person': [
        {
          "name": "Victoria Hjalmarsson",
          "img": "victoria.png",
          "student_id": "16920035",
          "role": "Project manager"
        },
        {
          "name": "Simon Menard",
          "img": "keysim.png",
          "student_id": "16129161",
          "role": "Dev Web Site and API"
        },
      ]
    },
    {
      'team': 'android',
      'person': [
        {
          "name": "Maxime Lamarthe",
          "img": "maxime.png",
          "student_id": "16129095",
          "role": "Dev Web Site"
        },
        {
          "name": "Jean-Luc Tang",
          "img": "tang.png",
          "student_id": "16129131",
          "role": "Dev Android"
        },
        {
          "name": "Vireth Thach sok",
          "img": "vireth.png",
          "student_id": "16129114",
          "role": "Dev Android"
        }
      ]
    },
    {
      'team': 'video',
      'person': [
        {
          "name": "Youh Iddahamou",
          "img": "youh.png",
          "student_id": "16129157",
          "role": "Dev streaming video"
        },
        {
          "name": "Aymeric Gand",
          "img": "aymeric.png",
          "student_id": "16129137",
          "role": "Dev streaming video"
        }
      ]
    }
  ];
  constructor(){}
}
