import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MuncitydashboardPageRoutingModule } from './muncitydashboard-routing.module';

import { MuncitydashboardPage } from './muncitydashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MuncitydashboardPageRoutingModule
  ],
  declarations: [MuncitydashboardPage]
})
export class MuncitydashboardPageModule {}
