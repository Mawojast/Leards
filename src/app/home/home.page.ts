import { Component, ViewChild } from '@angular/core';
import { IonicModule, IonModal } from '@ionic/angular';
import { StackFormPage } from './stack-form/stack-form.page';
import { Stack } from '../interfaces/stack';
import { Storage } from '@ionic/storage-angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, StackFormPage, RouterModule, CommonModule],

})
export class HomePage {

  stacks: Stack[] = [];
  formMode: string = 'create';
  @ViewChild(IonModal) modal: IonModal;

  constructor(private leardsStorage: Storage) {}

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
   * Initializes stack objects
   */
  ngOnInit(): void {

    this.loadStacksFromStorage();
    alert('dsfsd'+this.stacks);
  }
}
