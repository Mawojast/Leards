import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { Storage } from '@ionic/storage-angular';
import { Stack } from '../interfaces/stack';
import { Card } from '../interfaces/card';

@Component({
  selector: 'app-stack-details',
  templateUrl: './stack-details.page.html',
  styleUrls: ['./stack-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
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

  constructor(
    private activeRoute: ActivatedRoute,
    private leardsStorage: Storage,
    private router: Router
  ) { }

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
