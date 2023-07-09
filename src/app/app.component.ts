import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private leardsStorage: Storage) {
    this.init();
  }

  async init(){
    await this.leardsStorage.defineDriver(cordovaSQLiteDriver);
    await this.leardsStorage.create();
  }
}
