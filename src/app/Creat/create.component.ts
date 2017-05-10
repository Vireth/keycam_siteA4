import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MdDialogRef} from '@angular/material';
import {KeycamService} from '../Service/keycam.service';
import {SnackBar} from '../Information/snack-bar';

@Component({
  selector: 'create',
  providers: [SnackBar],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  isDisabled;

  constructor(public dialogRefCreate: MdDialogRef<CreateComponent>,
              private snack: SnackBar,
              private keycamService: KeycamService) {}

  onSubmit(f: NgForm) {
    this.isDisabled = !this.isDisabled;
    if (f.valid === true) {
      this.keycamService.create(f.value.email as string, f.value.password as string)
        .then(response => {
          if (response === false) {
            this.snack.open('CREATE ERROR');
            this.isDisabled = !this.isDisabled;
          } else {
            this.dialogRefCreate.close();
            this.snack.open('CREATE SUCCESS');
            this.isDisabled = !this.isDisabled;
          }
        });
    } else {
      this.snack.open('FORM ERROR');
      this.isDisabled = !this.isDisabled;
    }
  }
}
