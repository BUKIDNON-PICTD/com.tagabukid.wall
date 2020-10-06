import { QrcodeService } from './../../services/qrcode.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';


@Component({
  selector: 'app-qrprofilelist',
  templateUrl: './qrprofilelist.page.html',
  styleUrls: ['./qrprofilelist.page.scss'],
})
export class QrprofilelistPage implements OnInit {
  ios: boolean;
  public items: any[] = [];
  public pagenumber: number;
  public pagesize: number;
  elementType: 'url';
  // public value = '{"lastname":"AGUILAR","firstname":"LIANNE","middlename":"MADERA","maidenname":"","nameextension":"","prenametitle":"","postnametitle":"","birthdate":"2020-10-05T13:33:53.348+08:00","gender":"F","birthplace":"","civilstatus":"MARRIED","profession":"","citizenship":"","religion":"","sss":"","tin":"","mobileno":"09061637300","phoneno":"","email":"","objid":"41c62d2d-ed1a-48d7-9870-b4bbe7dac414","address":{"province":{"lguname":"BUKIDNON","code":"101300000"},"municipality":{"lguname":"CITY OF MALAYBALAY (CAPITAL)","code":"101312000"},"barangay":{"lguname":"SUMPONG","code":"101312065"},"street":"STA. CRUZ ST., PUROK 3","text":"STA. CRUZ ST., PUROK 3  SUMPONG, CITY OF MALAYBALAY (CAPITAL) BUKIDNON"}}';
  constructor(
    private plt: Platform,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private socket: Socket,
    private qrcodesvc: QrcodeService
  ) { }

  ngOnInit() {
    this.plt.ready().then(() => {
      this.loadItems();
    });
  }

  loadItems() {
    this.qrcodesvc.getItems().then(items => {
      if (!items){
        this.items = [];
      } else {

       
      
        const sorteditems = items.sort((a, b) =>
          a.lastname > b.lastname ? 1 : -1
        );
        
        this.items = sorteditems.map(x =>
         {
           return {...x, qrdata: [
                  x.objid,
                  x.lastname,
                  x.firstname,
                  x.middlename,
                  x.birthdate,
                  x.gender,
                  x.civilstatus,
                  x.mobileno,
                  // x.address,
                  x.address.province.code,
                  x.address.province.lguname,
                  x.address.municipality.code,
                  x.address.municipality.lguname,
                  x.address.barangay.code,
                  x.address.barangay.lguname,
                  x.address.street
              ]
          //   [{
          //   // objid: x.objid,
          //   // lastname : x.lastname,
          //   // firstname : x.firstname,
          //   // middlename : x.middlename,
          //   // birthdate : x.birthdate,
          //   // gender : x.gender,
          //   // civilstatus : x.civilstatus,
          //   // mobileno : x.mobileno,
          //   // address : x.address,
          //   // province : x.address.province.code,
          //   // municipality : x.address.municipality.code,
          //   // barangay : x.address.barangay.code,
          //   // street : x.address.street
          //  }]
          }
         });
         // public value = '{"lastname":"AGUILAR","firstname":"LIANNE","middlename":"MADERA","maidenname":"","nameextension":"","prenametitle":"","postnametitle":"","birthdate":"2020-10-05T13:33:53.348+08:00","gender":"F","birthplace":"","civilstatus":"MARRIED","profession":"","citizenship":"","religion":"","sss":"","tin":"","mobileno":"09061637300","phoneno":"","email":"","objid":"41c62d2d-ed1a-48d7-9870-b4bbe7dac414","address":{"province":{"lguname":"BUKIDNON","code":"101300000"},"municipality":{"lguname":"CITY OF MALAYBALAY (CAPITAL)","code":"101312000"},"barangay":{"lguname":"SUMPONG","code":"101312065"},"street":"STA. CRUZ ST., PUROK 3","text":"STA. CRUZ ST., PUROK 3  SUMPONG, CITY OF MALAYBALAY (CAPITAL) BUKIDNON"}}';
      }
      console.log(this.items);
    });
  }

  deleteItem(item) {
    this.qrcodesvc.deleteItem(item.objid).then(item => {
     
      this.loadItems();
      this.showToast("Profile deleted");
    });
  }

  printQR(item){
    console.log(item.objid);
      var innerContents = document.getElementById(item.objid).innerHTML;
      var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
      popupWinindow.document.open();
      popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()"><div style="border-style:solid; border-width:0.5px; padding:1px; position:absolute; width:276px;"><div style="float:left; width:250px;"><center><img src="./assets/pgblogo.png" width="50px"/><p style="margin:0px; font-size:8px;"><u>'+ item.firstname + ' '+ item.middlename + ' <strong>' + item.lastname +  (item.nameextension ? ' ' + item.nameextension : '') + '</strong></u></p><p style="margin:0px; font-size:8px;">'+ item.address.text  +'</p></center><center>' + innerContents + '</center></div></div></html>');
      popupWinindow.document.close();
  }
  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });

    toast.present();
  }

  ionViewDidEnter() {
      this.loadItems();
  }

}
