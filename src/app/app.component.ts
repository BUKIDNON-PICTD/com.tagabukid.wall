import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Dashboard',
      url: 'dashboard',
      icon: 'bar-chart'
    },
    {
      title: 'Municipality View',
      url: 'muncitydashboard',
      icon: 'bar-chart'
    },
    // ,
    // {
    //   title: 'PICTD Map Portal',
    //   url: 'mapportal',
    //   icon: 'map'
    // },
    {
      title: 'Covid Map',
      url: 'maps',
      icon: 'map'
    },
    // {
    //   title: 'Advisories',
    //   url: 'advisories',
    //   icon: 'warning'
    // },
    // {
    //   title: 'Cases',
    //   url: 'cases',
    //   icon: 'people'
    // }
  ];
  public agencies = ['PGB', 'PNP', 'PHO', 'PICTD'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
