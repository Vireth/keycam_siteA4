import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MdDialog, MdDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {KeycamService} from '../Service/keycam.service';
import {SnackBar} from '../Information/snack-bar';
import {CookieService} from 'ngx-cookie';
import {CreateComponent} from '../Creat/create.component';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [SnackBar],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isDisabled;

  constructor(public dialogRefLogin: MdDialogRef<LoginComponent>,
              public dialogRefCreate: MdDialogRef<CreateComponent>,
              public dialog: MdDialog,
              private router: Router,
              private snack: SnackBar,
              private cookieService: CookieService,
              private keycamService: KeycamService) {}

  onSubmit(f: NgForm) {
    this.isDisabled = !this.isDisabled;
    if (f.valid === true) {
      this.keycamService.connection(f.value.email as string, f.value.password as string)
        .then(response => {
          if (response === false) {
            this.snack.open('LOGIN ERROR');
            this.isDisabled = !this.isDisabled;
          } else {
            const user = {
              token: response.token,
              id: response.id
            };
            this.cookieService.putObject('User', user);
            this.dialogRefLogin.close(f.value.email);
            this.router.navigate(['/camera']);
            this.snack.open('LOGIN SUCCESS');
            this.isDisabled = !this.isDisabled;
          }
        });
    } else {
      this.snack.open('FORM ERROR');
      this.isDisabled = !this.isDisabled;
    }
  }

  create() {
    this.dialogRefLogin.close();
    this.dialogRefCreate = this.dialog.open(CreateComponent);
  }
}
