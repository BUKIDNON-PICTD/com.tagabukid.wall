import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvisoriesPageRoutingModule } from './advisories-routing.module';

import { AdvisoriesPage } from './advisories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdvisoriesPageRoutingModule
  ],
  declarations: [AdvisoriesPage]
})
export class AdvisoriesPageModule {}
