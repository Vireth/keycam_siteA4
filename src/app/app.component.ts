import {Component} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {MdDialog} from '@angular/material';
import {LoginComponent} from './Login/login.component';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedValue: string;
  user: string = null;
  dialogRefLogin;

  languages = [
    {value: 'french', viewValue: 'French', image: './assets/flag_fr.png'},
    {value: 'english', viewValue: 'English', image: './assets/flag_gb.png'},
    {value: 'sweden', viewValue: 'Sweden', image: './assets/flag_se.png'}
  ];

  constructor(private translate: TranslateService,
              private cookieService: CookieService,
              private router: Router,
              public dialog: MdDialog) {
    let userLang = navigator.language.split('-')[0];
    userLang = /(fr|en|se)/gi.test(userLang) ? userLang : 'en';
    translate.setDefaultLang('en');
    translate.use(userLang);

    const check = this.cookieService.getObject('User');
    if (check) {
      this.user = check['email'];
    }

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

  openDialog() {
    this.dialogRefLogin = this.dialog.open(LoginComponent);
    this.dialogRefLogin.afterClosed().subscribe(result => {
      if (result != null) {
        this.user = result;
      }
    });
  }

  logOut() {
    this.user = null;
    this.cookieService.removeAll();
    this.router.navigate(['/team']);
  }
}
