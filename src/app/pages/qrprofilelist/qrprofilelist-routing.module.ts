import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrprofilelistPage } from './qrprofilelist.page';

const routes: Routes = [
  {
    path: '',
    component: QrprofilelistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrprofilelistPageRoutingModule {}
