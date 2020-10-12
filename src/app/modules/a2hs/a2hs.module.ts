import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A2hsPromptComponent } from 'src/app/components/a2hs-prompt/a2hs-prompt.component';
import { A2hsIosComponent } from 'src/app/components/a2hs-ios/a2hs-ios.component';
import { A2hsBrowserComponent } from 'src/app/components/a2hs-browser/a2hs-browser.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ 
    A2hsPromptComponent,
    A2hsIosComponent,
    A2hsBrowserComponent

  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    A2hsPromptComponent,
    A2hsIosComponent,
    A2hsBrowserComponent
  ]
})
export class A2hsModule { }
