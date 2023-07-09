import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StackComponent } from './stack.component';


@NgModule({
  declarations: [StackComponent],
  imports: [
    CommonModule, FormsModule, IonicModule, RouterModule
  ],
  exports: [StackComponent]
})
export class StackComponentModule { }
