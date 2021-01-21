import { VaccinesurveyService } from './../../services/vaccinesurvey.service';
import { QrcodeService } from './../../services/qrcode.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { VaccineSurveyReasonModalComponent } from 'src/app/components/vaccine-survey-reason-modal/vaccine-survey-reason-modal.component';

@Component({
  selector: 'app-vaccinesurvey',
  templateUrl: './vaccinesurvey.page.html',
  styleUrls: ['./vaccinesurvey.page.scss'],
})
export class VaccinesurveyPage implements OnInit {
  public items: any;
  public surveys: any;
  public currentItem: any;
  reasonModalResponse: any;

  constructor(
    public qrcodeService: QrcodeService,
    public vaccineSurveyService: VaccinesurveyService,
    public modalController: ModalController,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.loadprofiles();
    this.loadsurveys();
  }

  loadprofiles(){
    this.qrcodeService.getItems().then( items => {
      this.items = items;
    })
  }

  loadsurveys(){
    this.vaccineSurveyService.getItems().then( surveys => {
      this.surveys = surveys;
    })
  }

  choiceClicked(item, choice) {
    this.currentItem = item;
    choice === "yes" ? this.sendSurveyData(this.currentItem, choice, "vaccineissafe")
    : this.presentModal(choice);
  }

  async presentModal(choice) {
    const modal = await this.modalController.create({
      component: VaccineSurveyReasonModalComponent,
      componentProps: {
        choice: choice,
      }
    });

    modal.onDidDismiss().then((data: any) => {
      this.reasonModalResponse = data ;
      if (this.reasonModalResponse.data.reason) this.sendSurveyData(this.currentItem, this.reasonModalResponse.data.choice, this.reasonModalResponse.data.reason)
    })

    return await modal.present();
  }

  sendSurveyData(item, choice, reason){
    this.vaccineSurveyService.addItem(
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
        reason: reason
      }
    )
    .then(status => {
      this.presentToast()
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Your survey data has been saved.",
      duration: 2000,
      color: "success"
    });
    toast.present();
  }

}
