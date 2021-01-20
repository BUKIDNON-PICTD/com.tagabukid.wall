import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VaccinesurveyPageRoutingModule } from './vaccinesurvey-routing.module';

import { VaccinesurveyPage } from './vaccinesurvey.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VaccinesurveyPageRoutingModule
  ],
  declarations: [VaccinesurveyPage]
})
export class VaccinesurveyPageModule {}
