import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MuncitydashboardPage } from './muncitydashboard.page';

const routes: Routes = [
  {
    path: '',
    component: MuncitydashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MuncitydashboardPageRoutingModule {}
