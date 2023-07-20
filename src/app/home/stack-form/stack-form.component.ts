import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Stack } from 'src/app/interfaces/stack';

@Component({
  selector: 'app-stack-form',
  templateUrl: './stack-form.component.html',
  styleUrls: ['./stack-form.component.scss'],
})
export class StackFormComponent  implements OnInit {

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

  submitForm(){

    const formValue = this.form.getRawValue();
    alert(JSON.stringify(formValue));
    if(this.editStack){
      this.editStack = {...formValue, id: this.editStack.id};
      alert('edit: '+JSON.stringify(this.editStack));
    }else{
      this.editStack = {...formValue, id: 0};
      alert('insert: '+JSON.stringify(this.editStack))
    }

    this.submitStack.emit(this.editStack)
  }

  constructor() { }

  ngOnInit() {

    if(!this.editStack){

      alert('create');
      this.form.setValue({
        name: '',
        background_color: '#f2f2f2',
        font_color: '#0d0d0d'
      });

    }else{

      alert('edit');
      this.form.setValue({
        name: this.editStack.name,
        background_color: this.editStack.background_color,
        font_color: this.editStack.font_color
      });
    }
  }
}
