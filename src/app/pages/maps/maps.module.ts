import { OlmapModule } from './../../modules/olmap/olmap.module';
import { OlmapComponent } from './../../components/olmap/olmap.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapsPageRoutingModule } from './maps-routing.module';

import { MapsPage } from './maps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapsPageRoutingModule,
    OlmapModule
  ],
  declarations: [MapsPage]
})
export class MapsPageModule {}
