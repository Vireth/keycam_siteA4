import {MdSnackBar, MdSnackBarConfig} from '@angular/material';
import {Injectable} from '@angular/core';

@Injectable()
export class SnackBar {
  actionButtonLabel = 'X';
  action = false;
  autoHide = 2500;

  constructor(
    public snackBar: MdSnackBar) { }

  open(message: string) {
    const config = new MdSnackBarConfig();
    config.duration = this.autoHide;
    this.snackBar.open(message, this.action && this.actionButtonLabel, config);
  }
}
