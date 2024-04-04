import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Card } from 'src/app/interfaces/card';
import { Stack } from 'src/app/interfaces/stack';

@Component({
  selector: 'app-card-update-form',
  templateUrl: './card-update-form.page.html',
  styleUrls: ['./card-update-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, TranslateModule]
})
export class CardUpdateFormPage implements OnInit {

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
  constructor(private translateService: TranslateService) { }

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

  getTranslatedLanguage(key: string){
    return this.translateService.instant(key);
  }

  ngOnInit() {

    console.log(this.editCard);
    if(this.editCard && this.stacks){
      this.form.setValue({
        front: this.editCard.front,
        back: this.editCard.back,
        learned: this.editCard.learned.toString(),
      });
    }
  }

}
