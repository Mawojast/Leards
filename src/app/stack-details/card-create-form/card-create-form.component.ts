import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Card } from 'src/app/interfaces/card';
import { Stack } from'src/app/interfaces/stack';

@Component({
  selector: 'app-card-create-form',
  templateUrl: './card-create-form.component.html',
  styleUrls: ['./card-create-form.component.scss'],
})
export class CardCreateFormComponent {

  @Output() submitStack = new EventEmitter<Card>();

  form = new FormGroup({
    front: new FormControl('',{
      nonNullable: true,
      validators: [Validators.required]
    }),
    back: new FormControl('',{
      nonNullable: true,
      validators: [Validators.required]
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
