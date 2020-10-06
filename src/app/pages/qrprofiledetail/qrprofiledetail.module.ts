import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrprofiledetailPageRoutingModule } from './qrprofiledetail-routing.module';

import { QrprofiledetailPage } from './qrprofiledetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrprofiledetailPageRoutingModule
  ],
  declarations: [QrprofiledetailPage]
})
export class QrprofiledetailPageModule {}
