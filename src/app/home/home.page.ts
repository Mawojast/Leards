import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { IonicModule, IonModal } from '@ionic/angular';
import { StackFormPage } from './stack-form/stack-form.page';
import { Stack } from '../interfaces/stack';
import { Storage } from '@ionic/storage-angular';
import { RouterModule } from '@angular/router';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, StackFormPage, RouterModule, CommonModule, TranslateModule],

})
export class HomePage implements AfterViewInit {

  appLanguageList = [
    { code: 'en', title: 'english', text: 'English'},
    { code: 'de', title: 'german', text: 'Germany'},
  ];

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  toggleEditCheck: boolean = false;
  toggleDeleteCheck: boolean = false;
  stacks: Stack[] = [];
  editStack: Stack;
  formMode: string = 'create';
  @ViewChild(IonModal) modal: IonModal;
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

  constructor(private leardsStorage: Storage, private translateService: TranslateService) {
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

  /**
   * Deletes stack by ID of stack
   *
   * @param ev - Alertbox object
   * @param stackId - ID to delete a stack
   */
  async setDeleteResult(ev: any, stackId: number) {

    if(ev.detail.role === 'confirm'){
      this.stacks = this.stacks.filter(stack => stack.id !== stackId);
      await this.saveStacksToStorage();
      await this.loadStacksFromStorage();
    }
  }

  /**
   * Assings editMode to true/false and switches deleteMode property to false
   *
   */
  toggleEditMode(){

    if(this.toggleEditCheck === false){
      this.toggleEditCheck = true;
      this.toggleDeleteCheck = false;
    }else{
      this.toggleEditCheck = false;
    }
  }

    /**
   * Assings DeleteMode to true/false and switches EditMode property to false
   *
   */
  toggleDeleteMode(){

    if(this.toggleDeleteCheck === false){
      this.toggleDeleteCheck = true
      this.toggleEditCheck = false;
    }else{
      this.toggleDeleteCheck = false;
    }
  }

  /**
   * Method to close Form Modal
   */
  closeStackFormModal(){
    this.modal.dismiss(null, 'cancel');
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
   * Sets stacks property to Storage with key stacks.
   */
  async saveStacksToStorage(){

    await this.leardsStorage.set("stacks", JSON.stringify(this.stacks));
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
   * Gets value from Storage with key stacks and assigns to property stacks.
   */
  async loadStacksFromStorage(){

    const result = await this.leardsStorage.get("stacks");
    if(result !== null){
      this.stacks = JSON.parse(result);
    }
    //this.stacks = JSON.parse(result);

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

  getTranslatedDeletePrompt(key: string, stackName: string){
    let translatedText = this.translateService.instant(key);
    return translatedText+" "+stackName+"?";
  }

  getTranslatedSelectLanguageLabel(key: string){
    return  this.translateService.instant(key);
  }

  onLanguageChange(e: any) {
    this.translateService.use(e.target.value ? e.target.value : "en");
  }

  getCurrentLanguage(){
    const currentLanguageCode = this.translateService.currentLang;
    const language = this.appLanguageList.find(lang => lang.code === currentLanguageCode);
    return language?.text;
  }

  ngAfterViewInit() {
    this.configureSelectInterfaceOptions();
  }

  configureSelectInterfaceOptions() {
    const select = document.querySelector('ion-select');
    console.log(select);
    if (select) {
      select.interfaceOptions = {
        cssClass: 'custom-popover'
      };
    }
  }

  /**
   * Initializes stack objects
   */
  ngOnInit(): void {

    this.loadStacksFromStorage();
  }
}
