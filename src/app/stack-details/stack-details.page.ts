import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonModal, IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Storage } from '@ionic/storage-angular';
import { Stack } from '../interfaces/stack';
import { Card } from '../interfaces/card';
import { CardCreateFormPage } from './card-create-form/card-create-form.page';
import { CardUpdateFormPage } from './card-update-form/card-update-form.page';

@Component({
  selector: 'app-stack-details',
  templateUrl: './stack-details.page.html',
  styleUrls: ['./stack-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, CardCreateFormPage, CardUpdateFormPage, RouterLink]
})
export class StackDetailsPage implements OnInit {

  stacks: Stack[] = [];
  cards: Card[] = [];
  language: any;
  currentStack: Stack = {
    id: 0,
    name: '',
    background_color: '',
    font_color: '',
  };

  toggleEditCheck: boolean = false;
  toggleDeleteCheck: boolean = false;
  formMode = 'create';
  editCard: Card;


  @ViewChild(IonModal) modal: IonModal;
  handlerMessage: string = '';
  roleMessage:string = '';

  //TODO: Save stack options in store
  stackLearnOptions = {
    stack_id: 0,
    stack: 'ordered',
    cards: 'front',
  };

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

  constructor(
    private activeRoute: ActivatedRoute,
    private leardsStorage: Storage,
    private router: Router
  ) { }

  toggleEditCard(event: any){

    if(event.detail.checked === true){
      this.toggleDeleteCheck = false;
    }
    this.toggleEditCheck = event.detail.checked;
  }

  toggleDeleteCard(event: any){

    if(event.detail.checked === true){
      this.toggleEditCheck = false;
    }
    this.toggleDeleteCheck = event.detail.checked;
  }

  toggleStackOptionsStackMixed(event: any){

    if(event.detail.checked === true){
      this.stackLearnOptions.stack = 'mixed';
    }else{
      this.stackLearnOptions.stack = 'ordered';
    }
  }

  toggleStackLearnOptionsCards(event: any){

    this.stackLearnOptions.cards = event.detail.value;

  }

  closeCardFormModal(){

    this.formMode = 'create';
    this.modal.dismiss(null, 'cancel');
  }

  openEditCardModal(card: Card){

    this.formMode = "edit";
    this.editCard = card;
    this.modal.present();
  }

  async setDeleteResult(ev:any, card: Card) {

    if(ev.detail.role === 'confirm'){

      await this.deleteCardFromStorage(card.id);
      await this.loadCardsFromStorage(this.currentStack.id);
    }
  }


  async loadStacksFromStorage(stackId: number){

    const result = await this.leardsStorage.get("stacks");
    if(result){
      this.stacks = await JSON.parse(result);
      this.currentStack = this.stacks.find(stack => stack.id === stackId)!;
    }
  }

  async loadCardsFromStorage(stackId: number){

    const result = await this.leardsStorage.get("cards");
    if(result){
      const allCards: Card[] = JSON.parse(result);
      this.cards =  allCards.filter(card => card.stack_id === stackId);
    }else{
      this.cards = [];
    }
  }

  getHighestCardId(): number {

    if (this.cards.length === 0) {
      return 0;
    }

    return this.cards.reduce((prevCard, currCard) => {
      return currCard.id > prevCard.id ? currCard : prevCard;
    }).id;
  }

  async saveCard(card: Card){

    card.id = this.getHighestCardId() + 1;
    card.stack_id = this.currentStack.id;
    card.stack_name = this.currentStack.name
    this.cards.push(card);
    await this.saveCardsToStorage()
    await this.loadCardsFromStorage(this.currentStack.id);
    this.closeCardFormModal()
  }

  // TODO: change Stack
  async updateCard(card: Card){

    this.cards.map(cardToUpdate => {
      if(cardToUpdate.id === card.id){
        cardToUpdate.front = card.front;
        cardToUpdate.back = card.back;
        cardToUpdate.learned = card.learned;
        //cardToUpdate.stack_id = this.currentStack.id;
        //cardToUpdate.stack_name = this.currentStack.name;
      }
    });

    alert(JSON.stringify(this.cards));
    await this.saveCardsToStorage()
    await this.loadCardsFromStorage(this.currentStack.id);
    alert(JSON.stringify(this.cards));
    this.closeCardFormModal();
  }

  async saveCardsToStorage(){

    await this.leardsStorage.set("cards", JSON.stringify(this.cards));
  }

  async deleteCardFromStorage(cardId: number){

    const cardsToSave: Card[] = this.cards.filter(card => card.id !== cardId);
    await this.leardsStorage.set("cards", JSON.stringify(cardsToSave));
  }

  learnStack(){

    this.router.navigate(['/stack-learn', this.currentStack.id, this.stackLearnOptions.stack, this.stackLearnOptions.cards ])
  }

  async ngOnInit() {
    try{
      let stackId = parseInt(this.activeRoute.snapshot.paramMap.get('id')!);
      await this.loadStacksFromStorage(stackId);
      await this.loadCardsFromStorage(stackId);
    }catch(error){
      this.router.navigateByUrl('home');
    }
  }

}

