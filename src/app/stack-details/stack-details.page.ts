import { Component, OnInit, ViewChild } from '@angular/core';
import { Stack } from '../interfaces/stack';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Card } from '../interfaces/card';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-stack-details',
  templateUrl: './stack-details.page.html',
  styleUrls: ['./stack-details.page.scss'],
})
export class StackDetailsPage implements OnInit {

  stacks: Stack[];
  currentStack: Stack;
  cards: Card[];

  toggleEditCheck: boolean = false;
  toggleDeleteCheck: boolean = false;
  formMode = 'create';
  editCard: Card;

  @ViewChild(IonModal) modal: IonModal;
  handlerMessage: string = '';
  roleMessage:string = '';

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
    private router: Router) { }

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

    closeCardFormModal(){

      this.formMode = 'create';
      this.modal.dismiss(null, 'cancel');
    }

    openEditCardModal(card: Card){

      this.formMode = "edit";
      this.editCard = card;
      this.modal.present();
    }

    setDeleteResult(ev:any, card: Card) {

      if(ev.detail.role === 'confirm'){

        this.deleteCardFromStorage(card.id);
        this.loadCardsFromStorage(this.currentStack.id);
      }
    }

    async getHighestCardId() {

      const result = await this.leardsStorage.get("cards");
      const allCards: Card[] = await JSON.parse(result);
      if (allCards.length === 0) {
        return 0;
      }

      return allCards.reduce((prevCard, currCard) => {
        return currCard.id > prevCard.id ? currCard : prevCard;
      }).id;
    }

    async createCard(card: Card){
      alert(this.getHighestCardId);
      alert(card);
    }

    async deleteCardFromStorage(cardId: number){

      const result = await this.leardsStorage.get("cards");
      const allCards: Card[] = await JSON.parse(result);
      const cardsToSave: Card[] = allCards.filter(card => card.id !== cardId);
      await this.leardsStorage.set("cards", JSON.stringify(cardsToSave));
    }

    async loadStacksFromStorage(stackId: number){

      const result = await this.leardsStorage.get("stacks");
      alert(result);
      this.stacks = await JSON.parse(result);
      this.currentStack = this.stacks.find(stack => stack.id === stackId)!;
    }

    async loadCardsFromStorage(stackId: number){

      const result = await this.leardsStorage.get("cards");
      const allCards: Card[] = await JSON.parse(result);
      this.cards =  allCards.filter(card => card.stack_id === stackId);
    }

  ngOnInit() {
      try{
        let stackId = parseInt(this.activeRoute.snapshot.paramMap.get('id')!);
        this.loadStacksFromStorage(stackId);
        this.loadCardsFromStorage(stackId);
      }catch(error){
        this.router.navigateByUrl('home');
      }
  }

}
