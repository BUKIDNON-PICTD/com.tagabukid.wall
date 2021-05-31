import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { ChartsModule } from 'ng2-charts';
import { A2hsModule } from 'src/app/modules/a2hs/a2hs.module';
import { MuncovidpreviewModule } from 'src/app/modules/muncovidpreview/muncovidpreview.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    ChartsModule,
    A2hsModule,
    MuncovidpreviewModule,
    NgxDatatableModule

  ],
  declarations: [
    DashboardPage
  ]
})
export class DashboardPageModule {}
