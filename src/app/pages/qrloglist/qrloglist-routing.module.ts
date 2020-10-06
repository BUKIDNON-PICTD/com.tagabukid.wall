import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrloglistPage } from './qrloglist.page';

const routes: Routes = [
  {
    path: '',
    component: QrloglistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrloglistPageRoutingModule {}
