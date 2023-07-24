import { Component, OnInit, EventEmitter, Output } from '@angular/core';
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
    let stack: Stack = {...formValue, id: 0};
    alert('submitted: '+ stack);
    this.submitStack.emit(stack);

  }
  ngOnInit() {
    this.form.setValue({
      name: '',
      background_color: '#f2f2f2',
      font_color: '#0d0d0d'
    });
  }
}
