import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VaccinesurveydashboardPageRoutingModule } from './vaccinesurveydashboard-routing.module';

import { VaccinesurveydashboardPage } from './vaccinesurveydashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VaccinesurveydashboardPageRoutingModule
  ],
  declarations: [VaccinesurveydashboardPage]
})
export class VaccinesurveydashboardPageModule {}
