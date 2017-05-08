import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { KeycamService } from './keycam.service';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(private keyCamService: KeycamService, private router: Router) {}

  canActivate() {
    if (this.keyCamService.isLoggedIn()) { return true ; }

    this.router.navigate(['/team']);
    return false;
  }
}
