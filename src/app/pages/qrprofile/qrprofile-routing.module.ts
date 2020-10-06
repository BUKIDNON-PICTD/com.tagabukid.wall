import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrprofilePage } from './qrprofile.page';

const routes: Routes = [
  {
    path: '',
    component: QrprofilePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrprofilePageRoutingModule {}
