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
    public vaccineSurvey: VaccinesurveyService,
    private alertController: AlertController
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
          value: 'AstraZeneca',
        },
        {
          name: 'company',
          type: 'radio',
          label: 'Covovax',
          value: 'Covovax',
        },
        {
          name: 'company',
          type: 'radio',
          label: '​​​​Moderna',
          value: '​​​​Moderna',
        },
        {
          name: 'company',
          type: 'radio',
          label: '​​​​Pfizer-BioNTech',
          value: 'Pfizer-BioNTech',
        },
        {
          name: 'company',
          type: 'radio',
          label: 'Sinovac',
          value: 'Sinovac',
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
              profiledata: JSON.stringify(item),
              answer: "YES",
              brand: data,
              reason: "Approved"
            };
            this.vaccineSurvey.addItem(newitem).then(item => {
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
              profiledata: JSON.stringify(item),
              answer: "NO",
              reason: data.reason
            };
            this.vaccineSurvey.addItem(newitem).then(item => {
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
              profiledata: JSON.stringify(item),
              answer: "UNDECIDED",
              reason: data.reason
            };
            this.vaccineSurvey.addItem(newitem).then(item => {
              console.log(item.data);
            });     
          }
        }
      ]
    });
    await alert.present();
  }

}
