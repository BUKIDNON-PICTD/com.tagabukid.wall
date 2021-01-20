import { VaccinesurveyService } from './../../services/vaccinesurvey.service';
import { QrcodeService } from './../../services/qrcode.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vaccinesurvey',
  templateUrl: './vaccinesurvey.page.html',
  styleUrls: ['./vaccinesurvey.page.scss'],
})
export class VaccinesurveyPage implements OnInit {
  public items: any;
  constructor(
    public qrcodeService: QrcodeService,
    public vaccineSurvey: VaccinesurveyService
  ) { }

  ngOnInit() {
    this.loadprofiles();
  }

  loadprofiles(){
    this.qrcodeService.getItems().then( items => {
      console.log(items);
      this.items = items;
    })
  }

  clickyes(item){
    // console.log(item);
    // var profiledata = item;
    // var profilephoto = item?.photo;
    // delete profiledata.photo;
    // const newitem = {
    //   objid: item.objid,
    //   profiledata: JSON.stringify(profiledata),
    //   profilephoto: profilephoto,
    //   answer: "YES",
    //   reason: "SAMPLE REASON"
    // };
    console.log(item);
    item.address_province_code = item.address.province.code;
    item.address_province_lguname = item.address.province.lguname;
    item.address_municipality_code = item.address.municipality.code;
    item.address_municipality_lguname = item.address.municipality.lguname;
    item.address_barangay_code = item.address.barangay.code;
    item.address_barangay_lguname = item.address.barangay.lguname;
    item.address_street = item.address.street;
    item.answer = "YES";
    item.reason = "SAMPLE REASON"
    this.vaccineSurvey.addItem(item).then(item => {
      console.log(item);
    })
  }

  clickno(item){

  }

}
