import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapportalPageRoutingModule } from './mapportal-routing.module';
import { MapportalPage } from './mapportal.page';
import { SafePipeModule } from 'src/app/safepipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapportalPageRoutingModule,
    SafePipeModule
  ],
  declarations: [MapportalPage]
})
export class MapportalPageModule {}
