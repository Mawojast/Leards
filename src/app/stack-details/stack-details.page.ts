import { Component, OnInit, ViewChild } from '@angular/core';
import { Stack } from '../interfaces/stack';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Card } from '../interfaces/card';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-stack-details',
  templateUrl: './stack-details.page.html',
  styleUrls: ['./stack-details.page.scss'],
})
export class StackDetailsPage implements OnInit {

  stacks: Stack[] = [];
  cards: Card[] = [];
  currentStack: Stack = {
    id: 0,
    name: '',
    background_color: '',
    font_color: '',
    editingStackName: ''
  };


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
      await this.saveCardsToStorage();
      await this.loadCardsFromStorage(this.currentStack.id);
      this.closeCardFormModal()
    }

    async saveCardsToStorage(){

      await this.leardsStorage.set("cards", JSON.stringify(this.cards));
    }

    async deleteCardFromStorage(cardId: number){

      const result = await this.leardsStorage.get("cards");
      if(result){
        const allCards: Card[] = await JSON.parse(result);
        const cardsToSave: Card[] = allCards.filter(card => card.id !== cardId);
        await this.leardsStorage.set("cards", JSON.stringify(cardsToSave));
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
