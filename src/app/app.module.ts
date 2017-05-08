import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Http, HttpModule} from '@angular/http';
import {
  MdToolbarModule, MdButtonModule, MdSelectModule, MdDialogModule, MdInputModule,
  MdButtonToggleModule, MdSnackBarModule, MdTooltipModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home.component';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer.component';
import { TeamComponent } from './team.component';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate';
import {LoginComponent} from './Login/login.component';
import {KeycamService} from './Service/keycam.service';
import {CreateComponent} from './Creat/create.component';
import {CookieModule} from 'ngx-cookie';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    TeamComponent,
    LoginComponent,
    CreateComponent
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
  providers: [KeycamService],
  bootstrap: [AppComponent]
})
export class AppModule { }
