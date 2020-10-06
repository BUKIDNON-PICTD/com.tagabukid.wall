import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrprofilelistPageRoutingModule } from './qrprofilelist-routing.module';

import { QrprofilelistPage } from './qrprofilelist.page';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrprofilelistPageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [QrprofilelistPage]
})
export class QrprofilelistPageModule {}
