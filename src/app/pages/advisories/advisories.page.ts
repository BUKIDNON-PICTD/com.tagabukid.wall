import { Platform } from '@ionic/angular';
import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advisories',
  templateUrl: './advisories.page.html',
  styleUrls: ['./advisories.page.scss'],
})
export class AdvisoriesPage implements OnInit {
  isbrowser: boolean;

  constructor(private platform: Platform) { }

  ngOnInit() {
    this.platform.ready().then(source => {
      if (this.platform.is("android")) {
        this.isbrowser = false;
      } else if (this.platform.is("ios")) {
        this.isbrowser = false;
      } else {
        this.isbrowser = true;
      }
    });
  }

}
