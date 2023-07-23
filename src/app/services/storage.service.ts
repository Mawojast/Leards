import { Injectable } from '@angular/core';
import { Stack } from '../interfaces/stack';
import { Storage } from '@ionic/storage';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
    this.init();
  }

  async init(){

    await this.storage.defineDriver(cordovaSQLiteDriver);
    await this.storage.create();
  }

  async createStack(stacks: Stack[]){
    await this.storage.set('stacks', JSON.stringify(stacks));
  }

  /*async createStack(stacks: Stack[]){

    await Preferences.set({key: 'stacks', value: JSON.stringify(stacks)})
  }*/

  async readStack(){
    return (await this.storage.get('stacks'));
  }
  /*async readStack(){

    return (await Preferences.get({key: 'stacks'}))
  }*/

  async updateStack(stacks: Stack[]){

    await this.storage.set('stacks', JSON.stringify(stacks));
  }

  async deleteStack(key: string){

    await this.storage.remove('stacks');
  }

  async clearStorage(){

    await this.storage.clear();
  }
}
