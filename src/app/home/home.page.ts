import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { IonModal, RefresherCustomEvent } from '@ionic/angular';
import { MessageComponent } from '../message/message.component';
import { Storage } from '@ionic/storage-angular';

import { DataService, Message } from '../services/data.service';
import { Stack } from '../interfaces/stack';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  private data = inject(DataService);

  toggleEditCheck: boolean = false;
  toggleDeleteCheck: boolean = false;
  formMode = 'create';
  editStack: Stack;

  @ViewChild(IonModal) modal: IonModal;

  stacks: Stack[] = [];
  handlerMessage = '';
  roleMessage = '';

  public deleteAlertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        this.handlerMessage = 'Delete canceled';
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.handlerMessage = 'Delete confirmed';
      },
    },
  ];

  constructor(private leardsStorage: Storage) {}

  async saveStackToStorage(){
    await this.leardsStorage.set("stacks", JSON.stringify(this.stacks));
  }

  async loadStacksFromStorage(){
    const result = await this.leardsStorage.get("stacks");
    this.stacks = JSON.parse(result);

  }

  setDeleteResult(ev:any, stackId: number) {

    if(ev.detail.role === 'confirm'){
      //this.data.deleteStack(stackId);
      //this.stacks$ = this.data.selectStacks();
      this.stacks = this.stacks.filter(stack => stack.id !== stackId);
      this.saveStackToStorage();
      this.loadStacksFromStorage();
    }
  }

  toggleEditStack(event: any){

    if(event.detail.checked === true){
      this.toggleDeleteCheck = false;
    }
    this.toggleEditCheck = event.detail.checked;

  }

  toggleDeleteStack(event: any){

    if(event.detail.checked === true){
      this.toggleEditCheck = false;
    }
    this.toggleDeleteCheck = event.detail.checked;
  }

  getHighestStackId(): number {
    if (this.stacks.length === 0) {
      return 0;
    }

    return this.stacks.reduce((prevStack, currStack) => {
      return currStack.id > prevStack.id ? currStack : prevStack;
    }).id;
  }

  async saveStack(stack: Stack){

    if(stack.editingStackName === '' && stack.id === 0){
      stack.id = this.getHighestStackId() + 1;
      this.stacks.push(stack);
      this.saveStackToStorage();
      this.loadStacksFromStorage();
    }
    if(stack.editingStackName === stack.name){
      //this.data.updateStack(stack);
    }
    if(stack.editingStackName !== stack.name && stack.editingStackName !== ""){
      //this.data.updateStackWithCards(stack);
    }
    //this.stacks$ = this.data.selectStacks();
    //this.getStacks();
    this.closeStackFormModal();

  }

  /*closeDB(){

    this.db.close()
    .then(() => {
      alert('db closed');
    })
    .catch(e => alert(JSON.stringify(e)));
  }*/

  closeStackFormModal(){

    this.formMode = 'create';
    this.modal.dismiss(null, 'cancel');
  }

  openEditStackModal(stack: Stack){

    this.editStack = stack;
    this.modal.present();
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  setStack(){}

  /*async getStacks(){

    await this.storage.readStack().then((data: any) => {
      if(data.value){
        this.stacks.push(JSON.parse(data.value));
      }
    });
  }*/

  async updateStack(){}

  async deleteStack(){}



  getMessages(): Message[] {
    return this.data.getMessages();
  }

  ngOnInit(): void {
    this.loadStacksFromStorage();
  }

}
