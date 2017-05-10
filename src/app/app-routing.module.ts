import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {TeamComponent} from './team.component';
import {CreateComponent} from './Creat/create.component';
import {CameraComponent} from './Camera/camera.component';
import { CanActivateViaAuthGuard, CantActivateViaAuthGuard } from './Service/can-activate.service';

const routes: Routes = [
  { path: '', redirectTo: '/team', pathMatch: 'full'},
  { path: 'team', component: TeamComponent, canActivate: [CantActivateViaAuthGuard] },
  { path: 'create', component: CreateComponent },
  { path: 'camera', component: CameraComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: '**', redirectTo: '/team'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {

}
