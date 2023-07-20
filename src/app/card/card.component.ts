import { Component, ElementRef, Input, AfterViewInit, ViewChild, AfterViewChecked } from '@angular/core';
import { Card } from '../interfaces/card';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent  implements AfterViewInit {

  @Input() card: Card;
  @Input() toggleDeleteCheck: boolean;
  @Input() toggleEditCheck: boolean;
  isFlipped: boolean = false;
  cardHeight: number = 0;

  @ViewChild('frontCard', { static: false }) frontCardRef: ElementRef;
  @ViewChild('backCard') backCardRef: ElementRef;

  constructor() { }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  ngAfterViewInit() {
    console.log('afterViewInit - cardComponent');

    const frontCardElement = this.frontCardRef.nativeElement as HTMLElement;
    const backCardElement = this.backCardRef.nativeElement as HTMLElement;
    //alert(frontCardElement);
    //alert(backCardElement);

    if (frontCardElement && backCardElement) {
      const frontCardHeight = frontCardElement.offsetHeight;
      const backCardHeight = backCardElement.offsetHeight;
      this.cardHeight = Math.max(frontCardHeight, backCardHeight);
      /*alert('front: '+frontCardElement.offsetHeight);
      alert('back: ' +backCardElement.offsetHeight);
      alert('back: ' +backCardElement.offsetHeight);
      alert('CARDhEIGHT : ' +backCardElement.offsetHeight);*/
      //alert(this.cardHeight);
    }
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter - CardComponent');
    alert('ionViewDidEnter');
  }
}
