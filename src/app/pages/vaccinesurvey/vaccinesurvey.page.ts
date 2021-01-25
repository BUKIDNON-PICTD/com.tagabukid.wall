import { VaccinesurveyService } from './../../services/vaccinesurvey.service';
import { QrcodeService } from './../../services/qrcode.service';
import { Component, OnInit, NgZone } from '@angular/core';
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
    public toastController: ToastController,
    private zone: NgZone
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
 
  // choiceClicked(item, choice) {
  //   this.currentItem = item;
  //   const alreadyExist = this.surveys.find(survey => survey.objid === item.objid)
  //   alreadyExist.answer === choice? this.vaccineSurveyService.showAlert("alreadyExist") :
  //   choice === "yes" ? this.saveSurveyData(this.currentItem, choice, "vaccineissafe")
  //   : this.presentModal(choice);
  // }

  choiceClicked(item, choice) {
    this.currentItem = item;
    // const alreadyExist = this.surveys.find(survey => survey.objid === item.objid)
    // alreadyExist && alreadyExist.answer === choice ? 
    // this.vaccineSurveyService.showAlert("alreadyExist")
    // :
    choice === "yes" ? this.saveSurveyData(this.currentItem, choice, "vaccineissafe")
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
      if (this.reasonModalResponse.data.reason) this.saveSurveyData(this.currentItem, this.reasonModalResponse.data.choice, this.reasonModalResponse.data.reason)
    })

    return await modal.present();
  }

  saveSurveyData(item, choice, reason){
    const alreadyExist = this.surveys ? this.surveys.find(survey => survey.objid === item.objid) : 0
    alreadyExist ?
    this.vaccineSurveyService.updateItem(
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
        address: {
          barangay: {
            code : item.address.barangay.code,
            lguname: item.address.barangay.lguname,
          },
          province: {
            code: item.address.province.code,
            lguname: item.address.province.lguname
          },
          municipality: {
            code: item.address.municipality.code,
            lguname: item.address.municipality.lguname
          },
          street: item.address.street,
          text: item.address.text
        },
        barangay: {
          code : item.address.barangay.code,
          lguname: item.address.barangay.lguname,
        },
        province: {
          code: item.address.province.code,
          lguname: item.address.province.lguname
        },
        municipality: {
          code: item.address.municipality.code,
          lguname: item.address.municipality.lguname
        },
        nameextension: item.nameextension,
        answer: choice,
        reason: reason
      }
    )
    .then(status => {
      const type = status === 200 ? "success" : "fail"
      this.zone.run(() => {
        this.loadprofiles();
      });
      this.presentToast(type)
    })
    :
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
        address: {
          barangay: {
            code : item.address.barangay.code,
            lguname: item.address.barangay.lguname,
          },
          province: {
            code: item.address.province.code,
            lguname: item.address.province.lguname
          },
          municipality: {
            code: item.address.municipality.code,
            lguname: item.address.municipality.lguname
          },
          street: item.address.street,
          text: item.address.text
        },
        barangay: {
          code : item.address.barangay.code,
          lguname: item.address.barangay.lguname,
        },
        province: {
          code: item.address.province.code,
          lguname: item.address.province.lguname
        },
        municipality: {
          code: item.address.municipality.code,
          lguname: item.address.municipality.lguname
        },
        nameextension: item.nameextension,
        answer: choice,
        reason: reason
      }
    )
    .then(status => {
      const type = status === 201 ? "success" : "fail"
      this.zone.run(() => {
        this.loadprofiles();
      });
      this.presentToast(type)
    })
  }

  async presentToast(type) {
    const toast = type === "success"?
      await this.toastController.create({
        message: "Your survey data has been saved.",
        duration: 2000,
        color: "success"
      }) : 
      await this.toastController.create({
        message: "An error occured when saving your survey data.",
        duration: 2000,
        color: "danger"
      })
    toast.present();
  }

}
