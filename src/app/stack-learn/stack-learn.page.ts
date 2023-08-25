import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Card } from '../interfaces/card';
import { Stack } from '../interfaces/stack';
import { CardLearnPage } from './card-learn/card-learn.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-stack-learn',
  templateUrl: './stack-learn.page.html',
  styleUrls: ['./stack-learn.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, CardLearnPage, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StackLearnPage implements OnInit {

  cards: Card[];
  stack: Stack;

  learnedCards: number = 0;
  activeIndex: number = 0;

  constructor(private activeRoute: ActivatedRoute, private leardsStorage: Storage) { }

  /**
   * Loads all stacks and current stack from storage and assigns to class objectes
   *
   * @param stackId - ID of current stack
   */
  async loadStackFromStorage(stackId: number){

    const result = await this.leardsStorage.get("stacks");
    if(result){
      let stacks = await JSON.parse(result);
      this.stack = stacks.find((stack: { id: number; }) => stack.id === stackId)!;
    }
  }

  /**
   * Loads cards by given parameters form storage and assigns to class objectes
   *
   * @param stackId - ID of current stack
   * @param learnedCards - shows if cards are learned or unskilled
   */
  async loadCardsFromStorage(stackId: number, learnedCards: number){

    const result = await this.leardsStorage.get("cards");
    if(result){
      const allCards: Card[] = JSON.parse(result);
      this.cards =  allCards.filter(card => card.stack_id === stackId && card.learned === learnedCards);
    }else{
      this.cards = [];
    }
  }

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;

  /**
   * Captures the acitve slide index.
   *
   * @param event - Swiper object
   */
  onSlideChange(event: any ){

    console.log(event.detail[0].activeIndex);
    this.activeIndex = event.detail[0].activeIndex;

  }

  /**
   * Orders stack cards by setted option.
   *
   * @param order
   */
  orderCards(order: string){

    if(order === 'mixed'){
      for (let i = this.cards.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
    }
  }

  /**
   * Sets which card site will be shown first.
   *
   * @param showFirst
   */
  showFirst(showFirst: string){

    if(showFirst === 'back'){
      this.cards = this.cards.map(card => ({
        id: card.id,
        front: card.back,
        back: card.front,
        stack_name: card.stack_name,
        stack_id: card.stack_id,
        learned: card.learned,
      }));
    }

    if(showFirst === 'mixed'){
      this.cards = this.cards.map(card => {
        if(Math.random() > 0.4){
          return {
            id: card.id,
            front: card.back,
            back: card.front,
            stack_name: card.stack_name,
            stack_id: card.stack_id,
            learned: card.learned
          }
        }else{
          return {...card};
        }
      });
    }
  }

  /**
   * Sets card from unskilled to learned and saves it.
   *
   * @param card - Card object
   */
  async setCardToLearned(card: Card){

    this.cards.splice(this.activeIndex, 1);
    card.learned = 1;
    this.updateCard(card);
  }

  /**
   * Sets card from learned to unskilled and saves it.
   *
   * @param card - Card object
   */
  async setCardToUnskilled(card: Card){

    this.cards.splice(this.activeIndex, 1);
    card.learned = 0;
    this.updateCard(card);
  }

  /**
   * Saves updated card in storage
   *
   * @param card - Card object
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
        }
      });
      await this.leardsStorage.set("cards", JSON.stringify(cards));
    }else{
      alert('Sorry, update card went wrong');
    }
  }

  /**
   * Initializes parameter from active route and orders cards by given options
   */
  async ngOnInit() {

    let stackId = parseInt(this.activeRoute.snapshot.paramMap.get('id')!);
    this.loadStackFromStorage(stackId);
    this.learnedCards = parseInt(this.activeRoute.snapshot.paramMap.get('learned')!);

    await this.loadCardsFromStorage(stackId, this.learnedCards);
    this.orderCards(this.stack.cards.order);
    this.showFirst(this.stack.cards.show_first);
  }

}
