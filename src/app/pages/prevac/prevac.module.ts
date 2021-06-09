import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrevacPageRoutingModule } from './prevac-routing.module';

import { PrevacPage } from './prevac.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrevacPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PrevacPage]
})
export class PrevacPageModule {}
