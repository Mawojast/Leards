import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { IonModal, RefresherCustomEvent } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { TranslateConfigService } from '../services/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
import { ActionSheetController } from '@ionic/angular';

import { Stack } from '../interfaces/stack';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  toggleEditCheck: boolean = false;
  toggleDeleteCheck: boolean = false;
  formMode = 'create';
  editStack: Stack;
  language: any;

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

  /**
   * Initializes storage object
   *
   * @param leardsStorage - Object to handle storage
   */
  constructor(private leardsStorage: Storage, private translateConfigService: TranslateConfigService, public actionSheetController: ActionSheetController) {
    this.translateConfigService.getDefaultLanguage();
    this.language = this.translateConfigService.getCurrentLang();
  }

  /**
   * Sets stacks property to Storage with key stacks.
   */
  async saveStacksToStorage(){

    await this.leardsStorage.set("stacks", JSON.stringify(this.stacks));
  }

  /**
   * Gets value from Storage with key stacks and assigns to property stacks.
   */
  async loadStacksFromStorage(){

    const result = await this.leardsStorage.get("stacks");
    this.stacks = JSON.parse(result);

  }

  /**
   * Deletes stack by ID of stack
   *
   * @param ev - Alertbox object
   * @param stackId - ID to delete a stack
   */
  setDeleteResult(ev: any, stackId: number) {

    alert(typeof(ev));
    if(ev.detail.role === 'confirm'){
      this.stacks = this.stacks.filter(stack => stack.id !== stackId);
      this.saveStacksToStorage();
      this.loadStacksFromStorage();
    }
  }

  /**
   * Assings edit checkbox condition to edit property and switches delete property to false
   *
   * @param event - Checkbox Object
   */
  toggleEditStack(event: any){

    if(event.detail.checked === true){
      this.toggleDeleteCheck = false;
    }
    this.toggleEditCheck = event.detail.checked;

  }

  /**
   * Assings delete checkbox condition to edit property and switches edit property to false
   *
   * @param event - Checkbox Object
   */
  toggleDeleteStack(event: any){

    if(event.detail.checked === true){
      this.toggleEditCheck = false;
    }
    this.toggleDeleteCheck = event.detail.checked;
  }

  /**
   * determines the highest id of the stack objects
   *
   * @returns Number of highest Stack ID
   */
  getHighestStackId(): number {

    if (this.stacks.length === 0) {
      return 0;
    }

    return this.stacks.reduce((prevStack, currStack) => {
      return currStack.id > prevStack.id ? currStack : prevStack;
    }).id;
  }

  /**
   * Saves new stack to storage and updates list of stacks to show
   *
   * @param stack - new stack to save
   */
  async saveStack(stack: Stack){

    stack.id = this.getHighestStackId() + 1;
    this.stacks.push(stack);
    await this.saveStacksToStorage();
    await this.loadStacksFromStorage();

    this.closeStackFormModal();
  }

  /**
   * Updates a certain stack and saves to Storage
   *
   * @param stack - stack object to update
   */
  async updateStack(stack: Stack){

    this.stacks.map(stackToUpdate => {
      if(stackToUpdate.id === stack.id){
        stackToUpdate.name = stack.name;
        stackToUpdate.background_color = stack.background_color;
        stackToUpdate.font_color = stack.font_color;
      }
    });

    await this.saveStacksToStorage()
    await this.loadStacksFromStorage();
    this.closeStackFormModal();
  }

  /**
   * delete stack by stack ID from Storage
   *
   * @param stackId - ID for delete stack
   */
  async deleteStackFromStorage(stackId: number){

    const stacksToSave: Stack[] = this.stacks.filter(stack => stack.id !== stackId);
    await this.leardsStorage.set("stacks", JSON.stringify(stacksToSave));
  }

  /**
   * Method to close Form Modal
   */
  closeStackFormModal(){

    this.formMode = 'create';
    this.modal.dismiss(null, 'cancel');
  }

  /**
   * Prepares stack form modal to edit a stack
   *
   * @param stack - Stack object to edit
   */
  openEditStackModal(stack: Stack){

    this.formMode = 'edit';
    this.editStack = stack;
    this.modal.present();
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  async changeLanguage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Languages',
      buttons: [{
        text: 'English',
        icon: 'language-outline',
        handler: () => {
          this.language = 'en';
          this.translateConfigService.setLanguage('en');
        }
      }, {
        text: 'German',
        icon: 'language-outline',
        handler: () => {
          this.language = 'de';
          this.translateConfigService.setLanguage('de');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }

  /**
   * Initializes stack objects
   */
  ngOnInit(): void {

    this.loadStacksFromStorage();
  }

}
