import { Component } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
  public name = 'Simon';
  public student_id = '123456789';
  public role = 'Dev';
  public img = '';
  constructor(){}
}
