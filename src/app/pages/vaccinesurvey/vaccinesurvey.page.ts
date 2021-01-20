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

  clickchoice(item, choice){
    this.vaccineSurvey.addItem(
      {
        objid: item.objid,
        profilephoto: item.photo,
        lastname: item.lastname,
        firstname: item.firstname,
        middlename: item.middlename,
        birthdate: item.birthdate,
        gender: item.gender,
        civilstatus: item.civilstatus,
        mobileno: item.mobileno,
        address_province_code: item.address.province.code,
        address_province_lguname: item.address.province.lguname,
        address_municipality_code: item.address.municipality.code,
        address_municipality_lguname: item.address.municipality.lguname,
        address_barangay_code: item.address.barangay.code,
        address_barangay_lguname: item.address.barangay.lguname,
        address_street: item.address.street,
        answer: choice,
        reason: "SAMPLE REASON"
      }
    )
    .then(item => {
      console.log(item)
    });
  }
}
