import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StackDetailsPageRoutingModule } from './stack-details-routing.module';

import { StackDetailsPage } from './stack-details.page';
import { CardCreateFormComponent } from './card-create-form/card-create-form.component';
import { CardUpdateFormComponent } from './card-update-form/card-update-form.component';
import { CardComponent } from '../card/card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    StackDetailsPageRoutingModule
  ],
  declarations: [StackDetailsPage, CardCreateFormComponent, CardUpdateFormComponent, CardComponent]
})
export class StackDetailsPageModule {}
