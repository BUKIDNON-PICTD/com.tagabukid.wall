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


import { A2hsService } from './services/a2hs.service';
import { FormsModule } from '@angular/forms';
import { PushnotificationService } from './services/pushnotification.service';


import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { defineCustomElements } from '@ionic/pwa-elements/loader';



const config: SocketIoConfig = {
  url: `${environment.panganud}`,
  options: { options: { autoConnect: false } }
};
@NgModule({
  declarations: [
    AppComponent
  ],
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
    SocketIoModule.forRoot(config),
    FormsModule
    // NgxQRCodeModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    Network,
    A2hsService,
    PushnotificationService
    // Camera,
    // File,
    // WebView,
    // FilePath,
    // Base64,
    // BarcodeScanner
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

declare var require: any;

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);
