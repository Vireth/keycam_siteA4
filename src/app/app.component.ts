import {Component} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {MdDialog, MdDialogRef} from '@angular/material';
import {LoginComponent} from './Login/login.component';
import {consoleTestResultHandler} from 'tslint/lib/test';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedValue: string;
  user: string = null;

  foods = [
    {value: 'french', viewValue: 'French', image: './assets/flag_fr.png'},
    {value: 'english', viewValue: 'English', image: './assets/flag_gb.png'},
    {value: 'sweden', viewValue: 'Sweden', image: './assets/flag_se.png'}
  ];

  constructor(private translate: TranslateService,
              public dialog: MdDialog) {
    let userLang = navigator.language.split('-')[0];
    userLang = /(fr|en|se)/gi.test(userLang) ? userLang : 'en';
    translate.setDefaultLang('en');
    translate.use(userLang);

    if (userLang === 'fr') {
      this.selectedValue = 'french';
    } else if (userLang === 'se') {
      this.selectedValue = 'sweden';
    } else {
      this.selectedValue = 'english';
    }
  }

  flagSelected() {
    if (this.selectedValue === 'french') {
      this.translate.use('fr');
    } else if (this.selectedValue === 'sweden') {
      this.translate.use('se');
    } else {
      this.translate.use('en');
    }
  }

  openDialog() { // TODO TO MOVE
    const dialogRef = this.dialog.open(LoginComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.user = result;
    });
  }
}
