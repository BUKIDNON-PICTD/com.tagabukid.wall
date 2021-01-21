import { PushnotificationService } from './services/pushnotification.service';
import { environment } from 'src/environments/environment';
import { AlertController, ToastController } from "@ionic/angular";
import { OfflinemanagerService } from "./services/offlinemanager.service";
import { ConnectionStatus, NetworkService } from "./services/network.service";
import { Component, OnInit } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Socket } from "ngx-socket-io";
import { SettingsService } from "./services/settings.service";
import { SwPush, SwUpdate } from '@angular/service-worker';
import { version } from '../../package.json';

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})

export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: "Dashboard",
      url: "dashboard",
      icon: "bar-chart",
    },
    {
      title: "Municipality View",
      url: "muncitydashboard",
      icon: "bar-chart",
    },
    // ,
    // {
    //   title: 'PICTD Map Portal',
    //   url: 'mapportal',
    //   icon: 'map'
    // },
    {
      title: "Covid Map",
      url: "maps",
      icon: "map",
    },
    {
      title: 'Advisories',
      url: 'advisories',
      icon: 'warning'
    },
    {
      title: "Cases",
      url: "cases",
      icon: "people",
    },
    {
      title: "Create QR Profile",
      url: "qrprofile",
      icon: "person-add",
    },
    {
      title: "Vaccine Survey",
      url: "vaccinesurvey",
      icon: "medkit",
    },
    {
      title: "Vaccine Survey Dashboard",
      url: "vaccinesurveydashboard",
      icon: "grid",
    },
    {
      title: "QR Profile List",
      url: "qrprofilelist",
      icon: "list",
    },
    {
      title: "QR Scan",
      url: "scanqr",
      icon: "barcode",
    },
    {
      title: "QR Log List",
      url: "qrloglist",
      icon: "list",
    },
    {
      title: "Reports",
      url: "reportlist",
      icon: "list",
    },
    {
      title: "About",
      url: "about",
      icon: "information-circle",
    },
  ];
  public agencies = ["PGB", "PHO", "MHO", "PICTD"];
  syncserverstatus: boolean;
  
  public appVersion: string = version;

  public notificationsettings: boolean;
  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private socket: Socket,
    private settingsService: SettingsService,
    private networkService: NetworkService,
    private offlineManager: OfflinemanagerService,
    private toastController: ToastController,
    private swUpdate: SwUpdate,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private swPush: SwPush,
    private pushService: PushnotificationService
    
  ) {
    const VAPID_PUBLIC = 'BNOJyTgwrEwK9lbetRcougxkRgLpPs1DX0YCfA5ZzXu4z9p_Et5EnvMja7MGfCqyFCY4FnFnJVICM4bMUcnrxWg';
    // this.messagingService.requestPermission().subscribe( async token => {
    //   await this.messagingService.checkSubscriptionStatus({push_access_token : token}).then(result => {
    //     if (result.status === 'ACTIVE'){
    //       this.notificationsettings = true;
    //     }else {
    //       this.notificationsettings = false;
    //     }
    //   });
    // });
    if (swPush.isEnabled) {
      swPush.requestSubscription({
          serverPublicKey: VAPID_PUBLIC,
        })
        .then(subscription => {
          pushService.sendSubscriptionToTheServer(subscription).subscribe();
        })
        .catch(console.error);
    }
    this.initializeApp();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.socket.ioSocket.io.uri = `${environment.panganud}`;
      this.socket.connect();
      this.socket.on("connect", () => {
        this.syncserverstatus = true;
        this.offlineManager.syncQRLogs();
        this.settingsService.getItems().then((items) => {
          this.socket.emit("clientcheckin", items);
        });
      });
      this.socket.on("disconnect", () => {
        this.syncserverstatus = false;
        console.log("you have been disconnected");
      });
      this.socket.on("reconnect", () => {
        this.syncserverstatus = true;
        console.log("you have been reconnected");
      });
      this.socket.on("reconnect_error", () => {
        this.syncserverstatus = false;
        console.log("attempt to reconnect has failed");
      });

      // this.networkService.onNetworkChange().subscribe((status: ConnectionStatus) => {
      //   if (status === ConnectionStatus.Online) {
      //     console.log(status);
      //     // this.offlineManager.checkForEvents().subscribe();
      //       // if (this.networkService.isSyncServerOnline()) {
      //       //   this.syncserverstatus = true;
      //       // } else {
      //       //   this.syncserverstatus = false;
      //       // }
      //     // this.networkService.onSyncServerStatusChange().subscribe( (syncserverstatus: ConnectionStatus) => {
      //     //   console.log(syncserverstatus);
      //     //   if (syncserverstatus === ConnectionStatus.Online) {
      //     //     this.syncserverstatus = true;
      //     //     // this.offlineManager.checkForEvents().subscribe();
      //     //     // this.showToast("Sync Server is Online");
      //     //   } else {
      //     //     this.syncserverstatus = false;
      //     //     // this.showToast("Sync Server is Offline");
      //     //   }
      //     // });
      //   }
      // });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    // const path = window.location.pathname.split("folder/")[1];
    // if (path !== undefined) {
    //   this.selectedIndex = this.appPages.findIndex(
    //     (page) => page.title.toLowerCase() === path.toLowerCase()
    //   );
    // }
    
    this.swUpdate.available.subscribe(async res => {
      const toast = await this.toastController.create({
        message: 'Update available!',
        position: 'bottom',
        buttons: [{ role: 'cancel', text: 'Reload' }]
      });
      await toast.present();
      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
    this.swUpdate.checkForUpdate();
    setInterval(() => {
      this.swUpdate.checkForUpdate();
    } , 15 * 60 * 1000);
    // this.listenForMessages();
  }

  // listenForMessages() {
  //   this.messagingService.getMessages().subscribe(async (msg: any) => {
  //     console.log(msg);
  //     const alert = await this.alertCtrl.create({
  //       header: msg.notification.title,
  //       subHeader: msg.notification.body,
  //       message: msg.data.info,
  //       buttons: ['OK'],
  //     });
  //     await alert.present();
  //   });
  // }

  // updateNotificationSetting() {
  //   if (this.notificationsettings){
  //     this.requestPermission();
  //   } else {
  //     this.deleteToken();
  //   }
  // }

  // requestPermission() {
  //   this.messagingService.requestPermission().subscribe(
  //     async token => {
  //       // const toast = await this.toastCtrl.create({
  //       //   message: 'Got your token',
  //       //   duration: 2000
  //       // });
  //       // toast.present();
  //       await this.messagingService.subscribe({push_access_token : token});
  //     },
  //     async (err) => {
  //       const alert = await this.alertCtrl.create({
  //         header: 'Error',
  //         message: err,
  //         buttons: ['OK'],
  //       });
 
  //       await alert.present();
  //     }
  //   );
  // }
 
  // async deleteToken() {
  //   this.messagingService.deleteToken();
  //   // const toast = await this.toastCtrl.create({
  //   //   message: 'Token removed',
  //   //   duration: 2000
  //   // });
  //   // toast.present();
  // }
}
