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

  learnedCards: number = 0;
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

  /**
   * Assings edit checkbox condition to edit property and switches delete property to false
   *
   * @param event - Checkbox Object
   */
  toggleEditCard(event: any){

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
  toggleDeleteCard(event: any){

    if(event.detail.checked === true){
      this.toggleEditCheck = false;
    }
    this.toggleDeleteCheck = event.detail.checked;
  }

  /**
   * Sets the order of the current stack in stack-learn page in ordered or mixed.
   *
   * @param event - Radio object
   */
  toggleStackLearnOptionsStack(event: any){

    this.stackLearnOptions.stack = event.detail.value;
  }

  /**
   * Sets how the cards will be shown in stack-learn page in front, back or mixed.
   *
   * @param event - Radio object
   */
  toggleStackLearnOptionsCards(event: any){

    this.stackLearnOptions.cards = event.detail.value;
  }

  /**
   * Sets which cards will be shown. Learned or unskilled cards.
   *
   * @param event - Section object
   */
  async toggleLearnedAndUnskilled(event: any){

    if(event.detail.value === 'learned'){
      this.learnedCards = 1;
      await this.loadCardsFromStorage(this.currentStack.id, this.learnedCards);
    }

    if(event.detail.value === 'unskilled'){
      this.learnedCards = 0;
      await this.loadCardsFromStorage(this.currentStack.id, this.learnedCards);
    }
  }

  /**
   * Closes form modal
   */
  closeCardFormModal(){

    this.formMode = 'create';
    this.modal.dismiss(null, 'cancel');
  }

  /**
   * Opens form modal to edit card
   *
   * @param card - Card object
   */
  openEditCardModal(card: Card){

    this.formMode = "edit";
    this.editCard = card;
    this.modal.present();
  }

  /**
   * Deletes  certain card given by parameter
   *
   * @param event - Alert confirmation object
   * @param card - Card object
   */
  async setDeleteResult(event:any, card: Card) {

    if(event.detail.role === 'confirm'){

      await this.deleteCard(card);
      await this.loadCardsFromStorage(this.currentStack.id, this.learnedCards);
    }
  }

  /**
   * Loads all stacks and current stack from storage and assigns to class objectes
   *
   * @param stackId - ID of current stack
   */
  async loadStacksFromStorage(stackId: number){

    const result = await this.leardsStorage.get("stacks");
    if(result){
      this.stacks = await JSON.parse(result);
      this.currentStack = this.stacks.find(stack => stack.id === stackId)!;
    }
  }

  /**
   * Loads cards by given parameters from storage and assigns to class objectes
   *
   * @param stackId - ID of current stack
   */
  async loadCardsFromStorage(stackId: number, learnedCards: number){

    const result = await this.leardsStorage.get("cards");
    if(result){
      const allCards: Card[] = JSON.parse(result);
      this.cards = allCards.filter(card => card.learned === learnedCards && card.stack_id === stackId);
    }else{
      alert('Load cards went wrong');
    }
  }

  /**
   * Returns highest number of card IDs
   *
   * @returns - number
   */
  getHighestCardId(): number {

    if (this.cards.length === 0) {
      return 0;
    }

    return this.cards.reduce((prevCard, currCard) => {
      return currCard.id > prevCard.id ? currCard : prevCard;
    }).id;
  }

  /**
   * Creates new card object and saves to storage
   *
   * @param card - Card object
   */
  async saveCreatedCard(card: Card){

    card.id = this.getHighestCardId() + 1;
    card.stack_id = this.currentStack.id;
    card.stack_name = this.currentStack.name
    //this.cards.push(card);
    await this.createCard(card)
    await this.loadCardsFromStorage(this.currentStack.id, this.learnedCards);
    this.closeCardFormModal()
  }

  /**
   * Updates card object and saves to storage
   *
   * @param card - Card object
   */
  // TODO: change Stack
  async saveUpdatedCard(card: Card){

    await this.updateCard(card);
    await this.loadCardsFromStorage(this.currentStack.id, this.learnedCards);
    this.closeCardFormModal();
  }

  /**
   * Creates card object
   *
   * @param card - Card object
   */
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
        await this.leardsStorage.set("cards", JSON.stringify(cards));
      }else{
        alert('Sorry, create card went wrong');
      }
    }
  }

  /**
   * Updates card object
   *
   * @param card
   */
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
      await this.leardsStorage.set("cards", JSON.stringify(cards));
    }else{
      alert('Sorry, update card went wrong');
    }
  }

  /**
   * delets card object
   *
   * @param card
   */
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

  /**
   * navigates to stack-learn page with stackID and options
   */
  navigateToStackLearn(){

    this.router.navigate(['/stack-learn', this.currentStack.id, this.stackLearnOptions.stack, this.stackLearnOptions.cards, this.learnedCards ])
  }

  /**
   * Initializes stacks and cards by ID of stack
   */
  async ngOnInit() {
    try{
      let stackId = parseInt(this.activeRoute.snapshot.paramMap.get('id')!);
      await this.loadStacksFromStorage(stackId);

      let keys = await this.leardsStorage.keys();
      let cards = keys.find(value => {
        return value === 'cards';
      });
      if(cards){
        await this.loadCardsFromStorage(stackId, this.learnedCards);
        this.cardsExists = true;
      }

    }catch(error){
      this.router.navigateByUrl('home');
    }
  }
}

