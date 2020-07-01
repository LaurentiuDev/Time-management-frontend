import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { HttpErrorInterceptor } from './shared/interceptors/error.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { CalendarModule } from 'ion2-calendar';
import { AppSettings } from './shared/settings/appsettings.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from './core/translate-loader-factory';
//import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

import 'chartjs-plugin-zoom';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };

export function initAppSettings(appSettings: AppSettings) {
  return () => appSettings.load();
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CalendarModule,
    AppRoutingModule,
    IonicModule.forRoot(
      //{mode: 'ios'}
    ),
    MatSnackBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    SocketIoModule.forRoot(config)
  ],
  providers: [
    DatePipe,
    StatusBar,
    SplashScreen,
    AppSettings,
    //LocalNotifications,
    {
      provide: APP_INITIALIZER,
      useFactory: initAppSettings,
      deps: [AppSettings],
      multi: true,
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule { }
