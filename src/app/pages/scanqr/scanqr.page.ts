import { QrlogService } from './../../services/qrlog.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NumberValueAccessor, Validators } from '@angular/forms';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { SettingsService } from 'src/app/services/settings.service';
import jsQR from 'jsqr';
import * as moment from 'moment';
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-scanqr',
  templateUrl: './scanqr.page.html',
  styleUrls: ['./scanqr.page.scss'],
})
export class ScanqrPage implements OnInit {
  @ViewChild('video', { static: false }) video: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  @ViewChild('fileinput', { static: false }) fileinput: ElementRef;

  canvasElement: any;
  videoElement: any;
  canvasContext: any;
  scanActive = false;
  scanResult = null;
  loading: HTMLIonLoadingElement = null;

  // scanResult = null;
  // scannedCode = null;

 
  
  ios: boolean;
  public items: any[] = [];
  public pagenumber: number;
  public pagesize: number;
  queryText = "";
  settingForm: FormGroup;
  validation_messages: any;
  itemselected: any;
  public haslocationsetting: boolean;
  locationid: any;
  locationsetting: any;

  constructor(
    private settingsService: SettingsService,
    private plt: Platform,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private socket: Socket,
    private qrlogservice : QrlogService,
  ) {
    const isInStandaloneMode = () =>
      'standalone' in window.navigator && window.navigator['standalone'];
    if (this.plt.is('ios') && isInStandaloneMode()) {
      console.log('I am a an iOS PWA!');
      // E.g. hide the scan functionality!
    }


    this.settingForm = this.formBuilder.group({
      objid : [''],
      locationid: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.required
        ])
      ]
    });

    this.validation_messages = {
      locationid: [
        { type: "required", message: "Location ID is required." },
        {
          type: "maxlength",
          message: "Location ID cannot be more than 100 characters long."
        }
      ]
    };

  
  }

  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
    this.videoElement = this.video.nativeElement;
  }
 
  // Helper functions
  async showQrToast() {
    const toast = await this.toastController.create({
      message: `Open ${this.scanResult}?`,
      position: 'top',
      buttons: [
        {
          text: 'Open',
          handler: () => {
            window.open(this.scanResult, '_system', 'location=yes');
          }
        }
      ]
    });
    toast.present();
  }
 
  reset() {
    this.scanResult = null;
  }
 
  stopScan() {
    this.scanActive = false;
  }

  async startScan() {
    // Not working on iOS standalone mode!
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
   
    this.videoElement.srcObject = stream;
    // Required for Safari
    this.videoElement.setAttribute('playsinline', true);
   
    this.loading = await this.loadingController.create({});
    await this.loading.present();
   
    this.videoElement.play();
    requestAnimationFrame(this.scan.bind(this));
  }
   
  async scan() {
    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss();
        this.loading = null;
        this.scanActive = true;
      }
   
      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;
   
      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });
   
      if (code) {
        try{
          this.scanActive = false;
          this.scanResult = JSON.parse(code.data);
          var bdate = new Date(this.scanResult[4]);
          this.scanResult[4] = this.calculate_age(bdate);
          
          let log = {
            objid: this.create_UUID(),
            data: this.scanResult,
            rawdata: JSON.stringify(this.scanResult),
            txndatetime: moment().format('YYYY-MM-DD  HH:mm:ss.000'),
            locationid : this.locationsetting.locationid,
            deviceid : this.locationsetting.objid,
            personobjid : this.scanResult[0],
            lastname : this.scanResult[1],
            firstname: this.scanResult[2],
            middlename: this.scanResult[3],
            birthdate: bdate.toLocaleString(),
            gender: this.scanResult[5],
            civilstatus: this.scanResult[6],
            mobileno: this.scanResult[7],
            address_province_code : this.scanResult[8],
            address_province_lguname : this.scanResult[9],
            address_municipality_code : this.scanResult[10],
            address_municipality_lguname : this.scanResult[11],
            address_barangay_code : this.scanResult[12],
            address_barangay_lguname : this.scanResult[13],
            address_street : this.scanResult[14],
          }
          this.qrlogservice.addItem(log).then(item => {
            //do nothing
          });
        } catch (e) {
          let toast = this.toastController.create({
            message: `Invalid QR Code.`,
            duration: 3000,
            position: "bottom",
          });
          toast.then((toast) => toast.present());
        }
      } else {
        if (this.scanActive) {
          requestAnimationFrame(this.scan.bind(this));
        }
      }
    } else {
      requestAnimationFrame(this.scan.bind(this));
    }
  }

 twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
  }

 calculate_age(dob) { 
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

  captureImage() {
    this.fileinput.nativeElement.click();
  }
   
  handleFile(files: FileList) {
    const file = files.item(0);
   
    var img = new Image();
    img.onload = () => {
      this.canvasContext.drawImage(img, 0, 0, this.canvasElement.width, this.canvasElement.height);
      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });
   
      if (code) {
        this.scanResult = code.data;
        this.showQrToast();
      }
    };
    img.src = URL.createObjectURL(file);
  }


  ngOnInit() {
    this.plt.ready().then(() => {
      this.loadItems();
      this.settingsService.getItems().then(items => {
        if (items) {
          this.locationsetting = items[0];
        }
      });
    });
  }

  loadItems() {
    this.queryText = this.queryText.toLowerCase().replace(/,|\.|-/g, " ");
    const queryWords = this.queryText.split(" ").filter(w => !!w.trim().length);

    this.settingsService.getItems().then(items => {
      if (!items){
        this.haslocationsetting = false;
        this.items = [];
      } else {
        this.haslocationsetting = true;
        items.forEach(item => {
          this.filterItem(item, queryWords);
          this.locationid = item.locationid
        });
        items = items.filter(i => i.hide === false);
        const sorteditems = items.sort((a, b) =>
          a.locationid > b.locationid ? 1 : -1
        );
        this.items = sorteditems;
      }
    
    });
  }

  filterItem(item: any, queryWords: string[]) {
    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the session name than it passes the query test
      queryWords.forEach((queryWord: string) => {
        if (item.locationid.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this session passes the query test
      matchesQueryText = true;
    }

    item.hide = !matchesQueryText;
  }

  saveItem() {
    if (this.settingForm.valid) {
      this.settingsService.getItem(this.settingForm.value).then(item => {
        if (item) {
          this.updateItem(this.settingForm.value);
        } else {
          this.addItem(this.settingForm.value);
        }
      });
    }
  }

  itemSelected(item) {
    this.settingForm.patchValue(item);
  }
  addItem(item) {
    item.objid = this.create_UUID();
    this.settingsService.addItem(item).then(item => {
      this.settingForm.reset();
      this.loadItems();
      this.showToast("setting created");
    });
  }
  updateItem(item) {
    this.settingsService.updateItem(item).then(item => {
      this.settingForm.reset();
      this.loadItems();
      this.showToast("setting updated");
    });
  }

  deleteItem() {
    this.settingsService.deleteItem();
    this.settingForm.reset();
    this.loadItems();
    this.showToast("setting deleted");
  }

  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });

    toast.present();
  }

  create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
  }

}

