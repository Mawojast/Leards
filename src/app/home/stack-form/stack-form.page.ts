import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup ,FormControl, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ColorPickerModule } from 'ngx-color-picker';
import { Stack } from 'src/app/interfaces/stack';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-stack-form',
  templateUrl: './stack-form.page.html',
  styleUrls: ['./stack-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, ColorPickerModule, TranslateModule]
})
export class StackFormPage implements OnInit {

  @Input() editStack?: Stack;
  @Output() submitStack = new EventEmitter<Stack>();
  fontColor: string = '#ffffff';


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

  inputFocus(event: any){
    console.log(event);
  }
  fontColorPicker(event: any){

  }

  nameInputChange(event: any){
    console.log(event.detail.value);
    console.log(this.form.value.name);
    if(this.form.value.name && this.form.value.background_color && this.form.value.font_color){
      this.form.setValue({
        name: event.detail.value,
        background_color: this.form.value.background_color,
        font_color: this.form.value.font_color
      });
    }
  }
  fontColorPickerSelect(event: any){
    if(this.form.value.name && this.form.value.background_color && this.form.value.font_color){
      this.form.setValue({
        name: this.form.value.name,
        background_color: this.form.value.background_color,
        font_color: event
      });
    }
  }
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
