import { MapportalService } from './../../services/mapportal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapportal',
  templateUrl: './mapportal.page.html',
  styleUrls: ['./mapportal.page.scss'],
})
export class MapportalPage implements OnInit {

  public params: any;
  public data: any;
  public mappath: any;

  constructor(
    public mapportalsvc: MapportalService,
    // private router: Router
    ) {
      this.data = [];
      // this.params = {
      //   reciever : 'bukidnon',
      //   sender : environment.clientcode,
      //   servicename	: 'TagabukidHRMISDashReportService',
      //   methodname	: 'getGeoMaps'
      // };
    }

  ngOnInit() {
    this.mapportalsvc.getmaps().subscribe(res => {
      Object(res).forEach(function(element) {
        element.url = "http://192.168.50.2/" + element.foldername;
        element.id = element.foldername;
      });
      this.data = res;
    });
  }

  // gotoMap(d) {
  //   this.router.navigate(['map/' + d.id]);
  // }


}
