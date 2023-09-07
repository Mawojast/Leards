import { Component, EventEmitter,Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Card } from 'src/app/interfaces/card';

@Component({
  selector: 'app-card-create-form',
  templateUrl: './card-create-form.page.html',
  styleUrls: ['./card-create-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class CardCreateFormPage{

  @Output() submitStack = new EventEmitter<Card>();

  form = new FormGroup({
    front: new FormControl('',{
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(256)]
    }),
    back: new FormControl('',{
      nonNullable: true,
      validators:[
        Validators.required,
        Validators.maxLength(256)]
    }),
  });

  submitForm(){

    try{
    const formValue = this.form.getRawValue();
    let card: Card =  {...formValue, id: 0, stack_id: 0, stack_name: '', learned: 0};
    this.submitStack.emit(card);
    }catch(error){
      alert(error);
    }
  }

}
