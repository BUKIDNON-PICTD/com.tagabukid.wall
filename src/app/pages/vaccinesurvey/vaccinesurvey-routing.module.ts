import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VaccinesurveyPage } from './vaccinesurvey.page';

const routes: Routes = [
  {
    path: '',
    component: VaccinesurveyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VaccinesurveyPageRoutingModule {}
