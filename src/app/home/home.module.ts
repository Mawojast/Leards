import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { MessageComponentModule } from '../message/message.module';
import { StackComponentModule } from "../stack/stack.module";
import { StackFormComponent } from './stack-form/stack-form.component';

@NgModule({
    declarations: [
      HomePage,
      StackFormComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MessageComponentModule,
        HomePageRoutingModule,
        StackComponentModule,
        ReactiveFormsModule
    ]
})
export class HomePageModule {}
