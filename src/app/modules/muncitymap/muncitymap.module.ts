import { MuncitymapComponent } from './../../components/muncitymap/muncitymap.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [MuncitymapComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    MuncitymapComponent
  ]
})
export class MuncitymapModule { }
