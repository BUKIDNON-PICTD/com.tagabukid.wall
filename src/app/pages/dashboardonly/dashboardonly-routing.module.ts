import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardonlyPage } from './dashboardonly.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardonlyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardonlyPageRoutingModule {}
