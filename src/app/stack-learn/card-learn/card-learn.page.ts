import { Component, ElementRef, Input, AfterViewInit, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Card } from 'src/app/interfaces/card';

@Component({
  selector: 'app-card-learn',
  templateUrl: './card-learn.page.html',
  styleUrls: ['./card-learn.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CardLearnPage {

  @Input() card: Card;
  isFlipped: boolean = false;

  constructor() { }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

}
