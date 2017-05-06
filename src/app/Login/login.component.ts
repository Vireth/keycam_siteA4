import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MdDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {KeycamService} from '../Service/keycam.service';
import {SnackBar} from '../Information/snack-bar';
import {CookieService} from 'ngx-cookie';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [SnackBar],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public dialogRef: MdDialogRef<LoginComponent>,
              private router: Router,
              private snack: SnackBar,
              private cookieService: CookieService,
              private keycamService: KeycamService) {}

  onSubmit(f: NgForm) {
    if (f.valid === true) {
      this.keycamService.connection(f.value.email as string, f.value.password as string)
        .then(response => {
          if (response === false) {
            this.snack.open('LOGIN ERROR');
          } else {
            const user = {
              token: response.token,
              id: response.id
            };
            this.cookieService.putObject('User', user);
            this.dialogRef.close(f.value.email);
            this.snack.open('LOGIN SUCCESS');
          }
        });
    } else {
      this.snack.open('FORM ERROR');
    }
  }

  create() {
    this.dialogRef.close();
    this.router.navigate(['/inscription']);
  }
}
