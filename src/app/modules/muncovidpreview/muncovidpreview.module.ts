import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MuncovidpreviewComponent } from 'src/app/components/muncovidpreview/muncovidpreview.component';


@NgModule({
  declarations: [MuncovidpreviewComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    MuncovidpreviewComponent
  ]
})
export class MuncovidpreviewModule { }
