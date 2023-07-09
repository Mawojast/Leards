import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';


@NgModule({
  declarations: [AppComponent],
  imports: [
    IonicStorageModule.forRoot({
      name: "leards",
      driverOrder: [
        cordovaSQLiteDriver._driver,
        Drivers.IndexedDB, Drivers.LocalStorage
      ],
    }),
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
