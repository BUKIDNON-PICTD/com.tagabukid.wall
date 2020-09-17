import { OlmapComponent } from './../../components/olmap/olmap.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [OlmapComponent],
  imports: [
    CommonModule
  ],
  exports: [
    OlmapComponent
  ]

})
export class OlmapModule { }
