import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {HomeComponent} from './home.component';
import {TeamComponent} from './team.component';
import {CreateComponent} from './Creat/create.component';
import {CameraComponent} from './Camera/camera.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'team', component: TeamComponent },
  { path: 'create', component: CreateComponent },
  { path: 'camera', component: CameraComponent }
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
