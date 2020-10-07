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
import { environment } from 'src/environments/environment.prod';

const config: SocketIoConfig = {
  url: 'https://panganud.bukidnon.gov.ph',
  options: { options: { autoConnect: false } }
};
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot({
      driverOrder: [ "sqlite","indexeddb", "websql"]
    }),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    }),
    SocketIoModule.forRoot(config),
    // NgxQRCodeModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    Network
    // BarcodeScanner
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
