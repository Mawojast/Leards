import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stack-learn',
  templateUrl: './stack-learn.page.html',
  styleUrls: ['./stack-learn.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class StackLearnPage implements OnInit {

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.activeRoute.snapshot.paramMap);
    let stackOrder = this.activeRoute.snapshot.paramMap.get('stack-order')!;
    alert(stackOrder);
  }

}
