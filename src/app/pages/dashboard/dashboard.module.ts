import { BarchartModule } from './../../modules/barchart/barchart.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { ChartsModule } from 'ng2-charts';
import { A2hsModule } from 'src/app/modules/a2hs/a2hs.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    ChartsModule,
    BarchartModule,
    A2hsModule
  ],
  declarations: [
    DashboardPage
  ]
})
export class DashboardPageModule {}
