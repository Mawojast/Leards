import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Card } from 'src/app/interfaces/card';
import { Stack } from 'src/app/interfaces/stack';

@Component({
  selector: 'app-card-update-form',
  templateUrl: './card-update-form.component.html',
  styleUrls: ['./card-update-form.component.scss'],
})
export class CardUpdateFormComponent  implements OnInit {

  @Input() editCard?: Card;
  @Input() stacks?: Stack[];
  @Output() submitCard = new EventEmitter<Card>();

  form = new FormGroup({
    front: new FormControl('',{
      nonNullable: true,
      validators: [Validators.required]
    }),
    back: new FormControl('',{
      nonNullable: true,
      validators: [Validators.required]
    }),
    learned: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
  });
  constructor() { }

  submitForm(){

    if(this.editCard && this.stacks){
      const formValue = this.form.getRawValue();
      this.editCard = {
        stack_id: this.editCard.stack_id,
        stack_name: this.editCard.stack_name,
        id: this.editCard.id,
        learned: parseInt(formValue.learned),
        front: formValue.front,
        back: formValue.back
      };
      this.submitCard.emit(this.editCard);
    }


  }

  ngOnInit() {

    if(this.editCard && this.stacks){
      this.form.setValue({
        front: this.editCard.front,
        back: this.editCard.back,
        learned: this.editCard.learned.toString(),
      });
    }
  }

}
