import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Card } from '../interfaces/card';
import { CardLearnPage } from './card-learn/card-learn.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-stack-learn',
  templateUrl: './stack-learn.page.html',
  styleUrls: ['./stack-learn.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, CardLearnPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StackLearnPage implements OnInit {

  cards: Card[] = [];

  constructor(private activeRoute: ActivatedRoute, private leardsStorage: Storage) { }

  async loadCardsFromStorage(stackId: number){

    const result = await this.leardsStorage.get("cards");
    if(result){
      const allCards: Card[] = JSON.parse(result);
      this.cards =  allCards.filter(card => card.stack_id === stackId && card.learned === 0);
    }else{
      this.cards = [];
    }
  }

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;

  logActiveIndex() {
    console.log(this.swiperRef?.nativeElement.swiper.activeIndex);
  }

  onSlideChange(e: any ){
    console.log(e);
    console.log(this.swiperRef?.nativeElement.swiper);

  }

  orderStack(stackOrder: string){

    if(stackOrder === 'mixed'){
      for (let i = this.cards.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
    }
  }

  orderCards(cardsOrder: string){

    if(cardsOrder === 'back'){
      this.cards = this.cards.map(card => ({
        id: card.id,
        front: card.back,
        back: card.front,
        stack_name: card.stack_name,
        stack_id: card.stack_id,
        learned: card.learned,
      }));
    }

    if(cardsOrder === 'mixed'){
      this.cards = this.cards.map(card => {
        if(Math.random() > 0.4){
          return {id: card.id, front: card.back, back: card.front, stack_name: card.stack_name, stack_id: card.stack_id, learned: card.learned}
        }else{
          return {...card};
        }
      });
    }
  }

  async setCardToLearned(card: Card){

    this.cards.map(cardToUpdate => {
      if(cardToUpdate.id === card.id){
        cardToUpdate.front = card.front;
        cardToUpdate.back = card.back;
        cardToUpdate.learned = 1;
        //cardToUpdate.stack_id = this.currentStack.id;
        //cardToUpdate.stack_name = this.currentStack.name;
      }
    });

    alert(JSON.stringify(this.cards));
    await this.saveCardsToStorage();
  }

  async saveCardsToStorage(){

    await this.leardsStorage.set("cards", JSON.stringify(this.cards));
  }

  async ngOnInit() {

    let stackId = parseInt(this.activeRoute.snapshot.paramMap.get('id')!);
    let cardsOrder = this.activeRoute.snapshot.paramMap.get('cards-order')!;
    let stackOrder = this.activeRoute.snapshot.paramMap.get('stack-order')!;

    await this.loadCardsFromStorage(stackId);
    this.orderStack(stackOrder);
    console.log(this.cards);
    this.orderCards(cardsOrder);
    console.log(this.cards);


  }

}
