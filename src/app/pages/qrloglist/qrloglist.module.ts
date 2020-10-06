import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrloglistPageRoutingModule } from './qrloglist-routing.module';

import { QrloglistPage } from './qrloglist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrloglistPageRoutingModule
  ],
  declarations: [QrloglistPage]
})
export class QrloglistPageModule {}
