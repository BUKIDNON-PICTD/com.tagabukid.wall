import { MuncitymapModule } from './../../modules/muncitymap/muncitymap.module';
import { MuncovidpreviewModule } from './../../modules/muncovidpreview/muncovidpreview.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardonlyPageRoutingModule } from './dashboardonly-routing.module';

import { DashboardonlyPage } from './dashboardonly.page';
import { ChartsModule } from 'ng2-charts';
import { BarchartModule } from 'src/app/modules/barchart/barchart.module';
import { A2hsModule } from 'src/app/modules/a2hs/a2hs.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardonlyPageRoutingModule,
    ChartsModule,
    BarchartModule,
    A2hsModule,
    MuncovidpreviewModule,
    MuncitymapModule
  ],
  declarations: [DashboardonlyPage]
})
export class DashboardonlyPageModule {}
