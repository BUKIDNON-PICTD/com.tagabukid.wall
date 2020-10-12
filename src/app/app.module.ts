import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { Network } from '@ionic-native/network/ngx';
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from 'src/environments/environment';

import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { A2hsComponent } from './a2hs/a2hs.component';
import { A2hsBrowserPromptComponent } from './a2hs-browser-prompt/a2hs-browser-prompt.component';
import { A2hsSafariHow2 } from './a2hs-ios-safari-how2/a2hs-ios-safari-how2';
import { A2hsService } from './services/a2hs.service';

const config: SocketIoConfig = {
  url: `${environment.panganud}`,
  options: { options: { autoConnect: false } }
};
@NgModule({
  declarations: [
    AppComponent,
    A2hsComponent,
    A2hsBrowserPromptComponent,
    A2hsSafariHow2],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot({
      driverOrder: [ "sqlite","indexeddb", "websql"]
    }),
    ServiceWorkerModule.register("combined-sw.js", {
      enabled: environment.production
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireMessagingModule,
    SocketIoModule.forRoot(config),
    // NgxQRCodeModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    Network,
    A2hsService
    // BarcodeScanner
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
