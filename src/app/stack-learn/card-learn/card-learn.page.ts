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
export class CardLearnPage implements AfterViewInit{

  @Input() card: Card;
  isFlipped: boolean = false;
  @ViewChild('frontCard') frontCard: any;
  @ViewChild('backCard') backCard: any;

  constructor() { }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  isTextOver128(text: string){
    return text.length > 128;
  }

  ngAfterViewInit() {
    this.updateFontSize();
  }

  updateFontSize() {
    const frontCardText = this.frontCard.nativeElement.textContent;
    const backCardText = this.backCard.nativeElement.textContent;

    if(this.isTextOver128(frontCardText)) {
      this.frontCard.nativeElement.style.fontSize = '2rem';
    }else{
      this.frontCard.nativeElement.style.fontSize = '3rem';
    }

    if(this.isTextOver128(backCardText)) {
      this.backCard.nativeElement.style.fontSize = '2rem';
    }else{
      this.backCard.nativeElement.style.fontSize = '3rem';
    }
  }
}
