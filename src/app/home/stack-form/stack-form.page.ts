import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup ,FormControl, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Stack } from 'src/app/interfaces/stack';

@Component({
  selector: 'app-stack-form',
  templateUrl: './stack-form.page.html',
  styleUrls: ['./stack-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class StackFormPage implements OnInit {

  @Input() editStack?: Stack;
  @Output() submitStack = new EventEmitter<Stack>();

  form = new FormGroup({
    name: new FormControl('',{
      nonNullable: true,
      validators: [Validators.required]
    }),
    background_color: new FormControl('',{
      nonNullable: true,
      validators: [Validators.required]
    }),
    font_color: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  constructor() { }

  submitForm(){

    const formValue = this.form.getRawValue();

    if(!this.editStack){
      this.editStack = {...formValue, id: 0, cards: {order: 'ordered', show_first: 'front'}};
    }else{
      this.editStack = {...formValue, id: this.editStack.id, cards: {order: this.editStack.cards.order, show_first: this.editStack.cards.show_first}};
    }

    this.submitStack.emit(this.editStack);
  }
  ngOnInit() {

    if(!this.editStack){

      this.form.setValue({
        name: '',
        background_color: '#f2f2f2',
        font_color: '#0d0d0d'
      });
    }else{

      this.form.setValue({
        name: this.editStack.name,
        background_color: this.editStack.background_color,
        font_color: this.editStack.font_color
      });
    }
  }
}
