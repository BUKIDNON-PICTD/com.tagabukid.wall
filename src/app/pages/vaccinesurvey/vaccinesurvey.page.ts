import { VaccinesurveyService } from './../../services/vaccinesurvey.service';
import { QrcodeService } from './../../services/qrcode.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-vaccinesurvey',
  templateUrl: './vaccinesurvey.page.html',
  styleUrls: ['./vaccinesurvey.page.scss'],
})
export class VaccinesurveyPage implements OnInit {
  public items: any;
  constructor(
    public qrcodeService: QrcodeService,
    public vaccinesurveyService: VaccinesurveyService,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.loadprofiles();
  }

  loadprofiles(){
    this.vaccinesurveyService.getItems().then( items => {
      console.log(items);
      this.items = items;
    })
  }

  async clickyes(item){
    
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Brand of Vaccine',
      subHeader: 'What vaccine do you prefer?',
      inputs: [
        {
          name: 'company',
          type: 'radio',
          label: 'AstraZeneca',
          value: 'ASTRAZENECA',
        },
        {
          name: 'company',
          type: 'radio',
          label: 'Covovax',
          value: 'COVOVAX',
        },
        {
          name: 'company',
          type: 'radio',
          label: '​​​​Moderna',
          value: 'MODERNA',
        },
        {
          name: 'company',
          type: 'radio',
          label: 'Novavax',
          value: 'NOVAVAX',
        },
        {
          name: 'company',
          type: 'radio',
          label: '​​​​Pfizer-BioNTech',
          value: 'PFIZER-BIONTECH',
        },
        {
          name: 'company',
          type: 'radio',
          label: 'Sinovac',
          value: 'SINOVAC',
        },        
        {
          name: 'company',
          type: 'radio',
          label: 'Undecided',
          value: '​​​​Undecided',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log("Brand choice: " + data);
            const newitem = {
              objid: item.objid,
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
              answer: "YES",
              brand: data,
              reason: "Approved"
            };
            this.vaccinesurveyService.addItem(newitem).then(item => {
              console.log(item);
            })
          }
        }
      ]
    });
    await alert.present();


  }

  async clickno(item) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Additional Information',
      inputs: [
        {
          name: 'reason',
          type: 'textarea',
          placeholder: 'Explain your reason in 10 sentences.'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            const newitem = {
              objid: item.objid,
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
              answer: "NO",
              reason: data.reason
            };
            this.vaccinesurveyService.addItem(newitem).then(item => {
              console.log(item.data);
            });     
          }
        }
      ]
    });
    await alert.present();
  }

  async clickundecided(item) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Additional Information',
      inputs: [
        {
          name: 'reason',
          type: 'textarea',
          placeholder: 'Explain your reason in 10 paragraph.'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            const newitem = {
              objid: item.objid,
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
              answer: "UNDECIDED",
              reason: data.reason
            };
            this.vaccinesurveyService.addItem(newitem).then(item => {
              console.log(item.data);
            });     
          }
        }
      ]
    });
    await alert.present();
  }

  clickchange(item) {

  }

}
