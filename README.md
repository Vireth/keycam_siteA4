# KEYCAM WITH ANGULAR 4

Projet Android for SOFTWARE PROJECT TRAINING 2 based on Angular 4 at BJTU (Beijing Jiaotong University)

#### Motivation and ambition

The project was born during a SOFTWARE PROJECT TRAINING 2 course at Beijing Jiaotong University in China between one team who wanted to create an Web app entirely based on functionality. I (Vireth) think to make an Web site since the first time I started to learn ANGULAR 4. In love with programming, I wanted to share it through an easy access application so everybody can join and try it. "KEYCAM" ambition is to place programming in the middle of a funny, entertaining so everybody even beginners can enjoy programming and hopefully start learning programming languages afterward.

## Structure

    .
    ├── e2e                     # Test unitaire
    ├── node_modules            # Lib Nod
    └── src                     # Source file
        ├── app                 # Component Service .html .ts .css
        |     ├── Camera        # Functionnality for camera
        |     ├── Creat         # Modal for creation user
        |     ├── Information   # Configuration of toast
        |     ├── Login         # Modal for login user
        |     ├── Service       # All service Http for the website 
        |     └── other         # app.module.ts / app-routing.module.ts
        ├── assets              # Images / Icones / Traduction
        |     ├── i18n          # Source for traduction en/fr/se
        |     ├── icones        # Source for icone of website
        |     └── team          # Source for image of team
        ├── environments        # Different configuration for prod / dev
        └── other               # Index.html / Some configuration

## Example modal

#### Login component TS

    @Component({
    selector: 'app-login',
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
              id: response.id,
              email: f.value.email
            };
            this.cookieService.putObject('User', user);
            this.dialogRefLogin.close(f.value.email);
            this.router.navigate(['/camera']);
            this.snack.open('LOGIN SUCCESS');
            this.isDisabled = !this.isDisabled;
            }
          });
        }   else {
          this.snack.open('FORM ERROR');
          this.isDisabled = !this.isDisabled;
        }
      }

      create() {
        this.dialogRefLogin.close();
        this.dialogRefCreate = this.dialog.open(CreateComponent);
      }
    }

Full code [here](https://github.com/vireth20/keycam_siteA4/blob/master/src/app/Login/login.component.ts)

#### #### Login component HTML

    <h1 md-dialog-title>{{ 'LOGIN.sign' | translate }}</h1>
    <form #f="ngForm" (ngSubmit)="onSubmit(f)" novalidate>
      <md-input-container>
      <input mdInput name="email" type="text" ngModel required placeholder="{{ 'LOGIN.email' | translate }}">
      </md-input-container>
      <br/>
      <md-input-container>
        <input mdInput name="password" type="password" ngModel required placeholder="{{ 'LOGIN.password' | translate }}">
      </md-input-container>
      <br><br>
      {{ 'LOGIN.create' | translate }} <a class="ici" (click)="create()">{{ 'LOGIN.here' | translate }}</a>
      <br><br>
      <md-dialog-actions>
        <button md-raised-button type="submit" [disabled]="isDisabled">{{ 'LOGIN.log' | translate }}</button>
      </md-dialog-actions>
    </form>
	
Full code [here](https://github.com/vireth20/keycam_siteA4/blob/master/src/app/Login/login.component.html)

## Examples Service

#### KEYCAM service ts (create)

       /.../
      create(email: string, password: string): Promise<any> {
        const url = `${this.url + 'register'}`;
        const data = {email: email, password: password};

       return this.http.post(url, data, {headers: this.headers})
          .toPromise()
          .then(response => response.json())
          .catch(response => false);
      }
      /.../


Full code [here](https://github.com/vireth20/keycam_siteA4/blob/master/src/app/Service/keycam.service.ts)

#### KEYCAM service ts (connection)
      
      /.../
     connection(email: string, password: string): Promise<any> {
        const url = `${this.url + 'authenticate'}`;
        const data = {email: email, password: password};

        return this.http.post(url, data, {headers: this.headers})
          .toPromise()
          .then(response => response.json())
          .catch(response => false);
      }
      /.../


Full code [here](https://github.com/vireth20/keycam_siteA4/blob/master/src/app/Service/keycam.service.ts)


## Examples Camera with socket IO

#### Camera component ts (askPicture)

    /.../
	  this.askPictureConnect = this.socketService.getPicture().subscribe(data => {
        if (data) {
          const historyItem = {
            name: 'Receive Photo',
            updated: new Date(),
          };
          this.Mypush(historyItem);
          const image = document.getElementById('pictureviewer')
            .setAttribute('src', 'data:image/png;base64,' + this.arrayBufferToBase64(data));
        }
    });
    /.../

Full code [here](https://github.com/vireth20/keycam_siteA4/blob/master/src/app/Camera/camera.component.ts)

## Team & Credits

[![Vireth](https://raw.githubusercontent.com/keysim/gearobot/master/doc/img/vireth.png)](http://vireth.com)
--- |
:monkey: [Vireth Thach sok](vireth.com)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2017 Vireth
