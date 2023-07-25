import { Component, ViewChild } from '@angular/core';
import { IonicModule, IonModal } from '@ionic/angular';
import { StackFormPage } from './stack-form/stack-form.page';
import { Stack } from '../interfaces/stack';
import { Storage } from '@ionic/storage-angular';
import { RouterModule } from '@angular/router';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, StackFormPage, RouterModule, CommonModule],

})
export class HomePage {

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

  constructor(private leardsStorage: Storage) {}

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
      alert(JSON.stringify(this.stacks));
      await this.saveStacksToStorage();
      await this.loadStacksFromStorage();
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
    alert("iD: " + JSON.stringify(this.stacks))
    console.log(this.stacks.length);
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
    alert('saveStack++++++'+JSON.stringify(this.stacks));
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
    console.log('stacks: '+ this.stacks);
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

  /**
   * Initializes stack objects
   */
  ngOnInit(): void {

    this.loadStacksFromStorage();
    alert('dsfsd'+this.stacks);
  }
}
