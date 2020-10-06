import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrprofiledetailPage } from './qrprofiledetail.page';

const routes: Routes = [
  {
    path: '',
    component: QrprofiledetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrprofiledetailPageRoutingModule {}
