import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrprofilePageRoutingModule } from './qrprofile-routing.module';

import { QrprofilePage } from './qrprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrprofilePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [QrprofilePage]
})
export class QrprofilePageModule {}
