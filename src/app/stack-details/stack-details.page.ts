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
  cardsExists: boolean = false;
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

      await this.deleteCard(card);
      await this.loadCardsFromStorage(this.currentStack.id);
    }
  }


  async loadStacksFromStorage(stackId: number){

    const result = await this.leardsStorage.get("stacks");
    console.log('loadStacks'+result)
    if(result){
      this.stacks = await JSON.parse(result);
      this.currentStack = this.stacks.find(stack => stack.id === stackId)!;
    }
  }

  async loadCardsFromStorage(stackId: number){

    const result = await this.leardsStorage.get("cards");
    console.log('loadCards'+result)
    if(result){
      const allCards: Card[] = JSON.parse(result);
      this.cards =  allCards.filter(card => card.stack_id === stackId);
    }else{
      alert('Load cards went wrong');
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

  async saveCreatedCard(card: Card){

    card.id = this.getHighestCardId() + 1;
    card.stack_id = this.currentStack.id;
    card.stack_name = this.currentStack.name
    //this.cards.push(card);
    await this.createCard(card)
    await this.loadCardsFromStorage(this.currentStack.id);
    this.closeCardFormModal()
  }

  // TODO: change Stack
  async saveUpdatedCard(card: Card){

    /*this.cards.map(cardToUpdate => {
      if(cardToUpdate.id === card.id){
        cardToUpdate.front = card.front;
        cardToUpdate.back = card.back;
        cardToUpdate.learned = card.learned;
        //cardToUpdate.stack_id = this.currentStack.id;
        //cardToUpdate.stack_name = this.currentStack.name;
      }
    });*/


    await this.updateCard(card);
    await this.loadCardsFromStorage(this.currentStack.id);
    this.closeCardFormModal();
  }

  async createCard(card: Card){

    if(!this.cardsExists){
      const cards: Card[] = [];
      cards.push(card);
      await this.leardsStorage.set('cards', JSON.stringify(cards));
      this.cardsExists = true;
    }else{
      const result = await this.leardsStorage.get("cards");
      if(result){
        const cards: Card[] = JSON.parse(result);
        cards.push(card);
        console.log(JSON.stringify(cards));
        await this.leardsStorage.set("cards", JSON.stringify(cards));
      }else{
        alert('Sorry, create card went wrong');
      }
    }
  }

  async updateCard(card: Card){

    const result = await this.leardsStorage.get("cards");
    if(result){
      const cards: Card[] = JSON.parse(result);
      cards.map(cardToUpdate => {
        if(cardToUpdate.id === card.id){
          cardToUpdate.front = card.front;
          cardToUpdate.back = card.back;
          cardToUpdate.learned = card.learned;
          //cardToUpdate.stack_id = this.currentStack.id;
          //cardToUpdate.stack_name = this.currentStack.name;
        }
      });
      console.log(card);
      console.log(cards);
      await this.leardsStorage.set("cards", JSON.stringify(cards));
    }else{
      alert('Sorry, update card went wrong');
    }
  }

  async deleteCard(card: Card){

    const result = await this.leardsStorage.get("cards");
    if(result){
      const cards: Card[] = JSON.parse(result);
      const cardsToSave: Card[] = cards.filter(cardToSave => cardToSave.id !== card.id);
      await this.leardsStorage.set("cards", JSON.stringify(cardsToSave));
    }else{
      alert('Sorry, delete card went wrong');
    }
  }

  navigateToStackLearn(){

    this.router.navigate(['/stack-learn', this.currentStack.id, this.stackLearnOptions.stack, this.stackLearnOptions.cards ])
  }

  async ngOnInit() {
    try{
      let stackId = parseInt(this.activeRoute.snapshot.paramMap.get('id')!);
      await this.loadStacksFromStorage(stackId);

      let keys = await this.leardsStorage.keys();
      let cards = keys.find(value => {
        return value === 'cards';
      });
      if(cards){
        await this.loadCardsFromStorage(stackId);
        this.cardsExists = true;
      }

    }catch(error){
      this.router.navigateByUrl('home');
    }
  }

}

