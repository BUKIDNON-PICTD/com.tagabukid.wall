import { BarchartComponent } from './../../components/barchart/barchart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [BarchartComponent],
  imports: [
    CommonModule,
    ChartsModule,
  ],
  exports: [
    BarchartComponent
  ]
})
export class BarchartModule { }
