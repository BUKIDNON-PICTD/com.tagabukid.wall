import { OlmappreviewModule } from './../../modules/olmappreview/olmappreview.module';
import { OlmapModule } from './../../modules/olmap/olmap.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CasesPageRoutingModule } from './cases-routing.module';

import { CasesPage } from './cases.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CasesPageRoutingModule,
    OlmappreviewModule
  ],
  declarations: [CasesPage]
})
export class CasesPageModule {}
