import { NgModule } from '@angular/core';

import { SafePipe } from './pipe';


@NgModule({
  declarations: [
    SafePipe,
  ],
  exports: [
    SafePipe
  ]
})
export class SafePipeModule {}