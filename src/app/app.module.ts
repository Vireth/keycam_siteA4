import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Http, HttpModule} from '@angular/http';
import {
  MdToolbarModule, MdButtonModule, MdSelectModule, MdDialogModule, MdInputModule,
  MdButtonToggleModule, MdSnackBarModule, MdTooltipModule, MdGridListModule, MdProgressBarModule, MdSliderModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer.component';
import { TeamComponent } from './team.component';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';
import {LoginComponent} from './Login/login.component';
import {KeycamService} from './Service/keycam.service';
import {CreateComponent} from './Creat/create.component';
import {CookieModule} from 'ngx-cookie';
import {CameraComponent} from './Camera/camera.component';
import { SocketService } from './Service/socket.service';
import { CanActivateViaAuthGuard, CantActivateViaAuthGuard } from './Service/can-activate.service';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    TeamComponent,
    LoginComponent,
    CreateComponent,
    CameraComponent
  ],
  imports: [
    CookieModule.forRoot(),
    // ANGULAR MATERIAL
    MdDialogModule,
    MdTooltipModule,
    MdSnackBarModule,
    MdButtonToggleModule,
    MdButtonModule,
    MdInputModule,
    MdToolbarModule,
    MdSelectModule,
    MdSnackBarModule,
    MdGridListModule,
    MdProgressBarModule,
    MdSliderModule,
    // END
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  entryComponents: [
    LoginComponent
  ],
  providers: [
    KeycamService,
    SocketService,
    CanActivateViaAuthGuard,
    CantActivateViaAuthGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
