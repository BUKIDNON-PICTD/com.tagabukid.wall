import { ToastController } from "@ionic/angular";
import { OfflinemanagerService } from "./services/offlinemanager.service";
import { ConnectionStatus, NetworkService } from "./services/network.service";
import { Component, OnInit } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Socket } from "ngx-socket-io";
import { SettingsService } from "./services/settings.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
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
    // {
    //   title: 'Advisories',
    //   url: 'advisories',
    //   icon: 'warning'
    // },
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
  ];
  public agencies = ["PGB", "PHO", "MHO", "PICTD"];
  syncserverstatus: boolean;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private socket: Socket,
    private settingsService: SettingsService,
    private networkService: NetworkService,
    private offlineManager: OfflinemanagerService,
    private toastController: ToastController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.socket.ioSocket.io.uri = "https://panganud.bukidnon.gov.ph";
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

      window["isUpdateAvailable"].then((isAvailable) => {
        if (isAvailable) {
          let toast = this.toastController.create({
            message:
              "New Update available! Reload the webapp to see the latest juicy changes.",
            duration: 3000,
            position: "bottom",
          });
          toast.then((toast) => toast.present());
        }
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
    const path = window.location.pathname.split("folder/")[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(
        (page) => page.title.toLowerCase() === path.toLowerCase()
      );
    }
  }
}
