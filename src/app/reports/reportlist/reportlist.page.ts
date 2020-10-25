import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reportlist',
  templateUrl: './reportlist.page.html',
  styleUrls: ['./reportlist.page.scss'],
})
export class ReportlistPage implements OnInit {
  public reports: any;
  constructor(private httpClient : HttpClient) { }

  ngOnInit() {
    this.reports = [];
    this.getReports().subscribe(async result => {
      this.reports = result["resourceLookup"];
      // .map(x =>{
      //   return {uri:'/reportpreview'+x.uri+'/'+x.label,label:x.label};
      // });
    });
    // http://cloud.bukidnon.gov.ph:8060/jasperserver/rest/resources/PHO?type=reportUnit&recursive=1&j_username=pho&j_password=pho@123
  }
  viewreport(item){
    let cridentialparams = {
      j_username : 'pho',
      j_password : 'pho@123',
      // OFFICENAME: "MUNICIPAL AGRICULTURE OFFICE",
      // TITLE : this.reportlabel,
    };
    const queryParamsString = new HttpParams({ fromObject: cridentialparams }).toString();
    console.log(item);
    window.open(`${environment.reportserver}/flow.html?_flowId=viewReportFlow&_flowId=viewReportFlow&ParentFolderUri=/PHO&reportUnit=${item.uri}&standAlone=true&${queryParamsString}`, '_blank', 'width=1024,height=600,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
  }
  private getReports(): Observable<any[]> {
    return this.httpClient.get<any>("https://reports.bukidnon.gov.ph/jasperserver/rest_v2/resources?type=reportUnit&folderUri=/PHO&j_username=pho&j_password=pho@123");
  }
}
