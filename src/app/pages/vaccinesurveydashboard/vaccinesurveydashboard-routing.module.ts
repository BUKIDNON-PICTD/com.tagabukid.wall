import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VaccinesurveydashboardPage } from './vaccinesurveydashboard.page';

const routes: Routes = [
  {
    path: '',
    component: VaccinesurveydashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VaccinesurveydashboardPageRoutingModule {}
