import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
//import { StackComponentModule } from "./stack/stack.module";
import { StackFormComponent } from './stack-form/stack-form.component';
import { StackComponent } from './stack/stack.component';

@NgModule({
    declarations: [
      HomePage,
      StackFormComponent,
      StackComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        //StackComponentModule,
        ReactiveFormsModule
    ]
})
export class HomePageModule {}
