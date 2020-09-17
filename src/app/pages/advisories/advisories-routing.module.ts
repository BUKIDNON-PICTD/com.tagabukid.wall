import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvisoriesPage } from './advisories.page';

const routes: Routes = [
  {
    path: '',
    component: AdvisoriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvisoriesPageRoutingModule {}
