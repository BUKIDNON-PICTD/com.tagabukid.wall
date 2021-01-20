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
    console.log(item);
    const newitem = {
      objid: item.objid,
      profiledata: JSON.stringify(item),
      answer: "YES",
      reason: "SAMPLE REASON"
    };
    this.vaccineSurvey.addItem(newitem).then(item => {
      console.log(item);
    })
  }

  clickno(item){

  }

  clickchoice(item, choice){
    const profilephoto = item?.photo;
    delete item.photo;
    const newitem = {
      objid: item.objid,
      profilephoto: profilephoto,
      profiledata: JSON.stringify({item}),
      answer: choice,
      reason: "SAMPLE REASON"
    };
    this.vaccineSurvey.addItem(newitem).then(response => {
      if (response === 200) console.log(`${item.objid} has been added!`)
    }, (error) => {
      if (error) console.log(error)
    })
  }

}
