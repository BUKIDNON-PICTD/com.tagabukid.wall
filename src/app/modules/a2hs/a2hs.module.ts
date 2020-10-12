import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A2hsComponent } from 'src/app/a2hs/a2hs.component';
import { A2hsBrowserPromptComponent } from 'src/app/a2hs-browser-prompt/a2hs-browser-prompt.component';
import { A2hsSafariHow2 } from 'src/app/a2hs-ios-safari-how2/a2hs-ios-safari-how2';
import { A2hsPromptComponent } from 'src/app/components/a2hs-prompt/a2hs-prompt.component';
import { A2hsIosComponent } from 'src/app/components/a2hs-ios/a2hs-ios.component';
import { A2hsBrowserComponent } from 'src/app/components/a2hs-browser/a2hs-browser.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ 
    A2hsComponent,
    A2hsBrowserPromptComponent,
    A2hsSafariHow2,
    A2hsPromptComponent,
    A2hsIosComponent,
    A2hsBrowserComponent

  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    A2hsComponent,
    A2hsBrowserPromptComponent,
    A2hsSafariHow2,
    A2hsPromptComponent,
    A2hsIosComponent,
    A2hsBrowserComponent
  ]
})
export class A2hsModule { }
