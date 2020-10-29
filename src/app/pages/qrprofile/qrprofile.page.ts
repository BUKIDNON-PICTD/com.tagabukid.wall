import { QrcodeService } from './../../services/qrcode.service';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, IonSlides, LoadingController, Platform, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, CameraPhoto, CameraSource } from '@capacitor/core';

const { Camera, Filesystem, Storage } = Plugins;

@Component({
  selector: 'app-qrprofile',
  templateUrl: './qrprofile.page.html',
  styleUrls: ['./qrprofile.page.scss'],
})
export class QrprofilePage implements OnInit {
  @ViewChild("personProfileSlider", { static: false })
  protected personProfileSlider: IonSlides;

  public personInformationForm: FormGroup;

  // public submitAttempt: boolean = false;
  public isend: boolean = false;
  public isbeginning: boolean = false;
  public validation_messages: any;
  
  provinces: any[];
  municipalities: any[];
  barangays: any[];
  matches: any[];
  farmer: any;
  mode: string;
  allowsave: boolean = true;
  ispolicyagree: boolean;
  viewEntered: boolean = false;
  isspouse: boolean = false;
  isSubmitted: boolean = false;
  images = [];
  photo: any;
  currentslide: number;
  private win: any = window;
  defaultHref: any;
  person: any;
  allowcreate: boolean;
  allowexceed: boolean;
  loading: HTMLIonLoadingElement = null;
  constructor(
    private qrcodesvc : QrcodeService,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private actionSheetController: ActionSheetController,
    private platform: Platform,
    private loadingController: LoadingController
  ) {
    this.allowcreate = false;
    this.allowexceed = false;
   

    this.platform.ready().then(source => {
      this.qrcodesvc.getItems().then(items => {
        if (this.platform.is("android")) {
          this.allowexceed = false;
        } else if (this.platform.is("ios")) {
          this.allowexceed = false;
        } else {
          this.allowexceed = true;
        }

        if (!items){
          this.allowcreate = true;
        } else {
          if (items.length <= 9 || this.allowexceed){
            this.allowcreate = true;
          }
        }
      });

   
    });

    this.personInformationForm = this.formBuilder.group({
      lastname: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.pattern("[a-zA-Z ]*"),
          Validators.required
        ])
      ],
      firstname: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.pattern("[a-zA-Z ]*"),
          Validators.required
        ])
      ],
      middlename: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.pattern("[a-zA-Z ]*"),
          Validators.required
        ])
      ],
      nameextension: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.pattern("[a-zA-Z ]*")
        ])
      ],
      birthdate: ["", Validators.compose([Validators.required])],
      gender: ["", Validators.compose([Validators.required])],
      civilstatus: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.pattern("[a-zA-Z ]*"),
          Validators.required
        ])
      ], 
      mobileno: [
        "",
        Validators.compose([
          Validators.pattern("^[0-9]*$"),
          Validators.maxLength(11),
          Validators.required
        ])
      ],
      province: this.formBuilder.group({
        lguname: [""],
        code: ["", Validators.compose([Validators.required])]
      }),
      municipality: this.formBuilder.group({
        lguname: [""],
        code: ["", Validators.compose([Validators.required])]
      }),
      barangay: this.formBuilder.group({
        lguname: [""],
        code: ["", Validators.compose([Validators.required])]
      }),
      street: ["", Validators.compose([Validators.required, Validators.maxLength(100)])]
    });
   
    this.validation_messages = {
      lastname: [
        { type: "required", message: "Last Name is required." },
        {
          type: "maxlength",
          message: "Last Name cannot be more than 100 characters long."
        },
        {
          type: "pattern",
          message: "Your Last Name must contain only letters."
        }
      ],
      firstname: [
        { type: "required", message: "First Name is required." },
        {
          type: "maxlength",
          message: "First Name cannot be more than 100 characters long."
        },
        {
          type: "pattern",
          message: "Your First Name must contain only letters."
        }
      ],
      middlename: [
        { type: "required", message: "Middle Name is required." },
        {
          type: "maxlength",
          message: "Middle Name cannot be more than 100 characters long."
        },
        {
          type: "pattern",
          message: "Your Middle Name must contain only letters."
        }
      ],
      maidenname: [
        { type: "required", message: "Maiden Name is required." },
        {
          type: "maxlength",
          message: "Maiden Name cannot be more than 100 characters long."
        },
        {
          type: "pattern",
          message: "Your Maiden Name must contain only letters."
        }
      ],
      nameextension: [
        {
          type: "maxlength",
          message: "Name Extension cannot be more than 100 characters long."
        },
        {
          type: "pattern",
          message: "Name Extension Name must contain only letters."
        }
      ],
      prenametitle: [
        {
          type: "maxlength",
          message: "Pre-name Title cannot be more than 100 characters long."
        },
        {
          type: "pattern",
          message: "Pre-name Title Name must contain only letters."
        }
      ],
      postnametitle: [
        {
          type: "maxlength",
          message: "Post-name Title cannot be more than 100 characters long."
        },
        {
          type: "pattern",
          message: "Post-name Title must contain only letters."
        }
      ],
      //personal info details
      birthplace: [
        {
          type: "maxlength",
          message: "Brith Place cannot be more than 100 characters long."
        },
        {
          type: "pattern",
          message: "Brith Place must contain only letters."
        }
      ],
      citizenship: [
        {
          type: "maxlength",
          message: "Citizensihp cannot be more than 100 characters long."
        },
        {
          type: "pattern",
          message: "Citizensihp must contain only letters."
        }
      ],
      civilstatus: [
        { type: "required", message: "Civil Status is required." },
        {
          type: "maxlength",
          message: "Civil Status cannot be more than 100 characters long."
        },
        {
          type: "pattern",
          message: "Civil Status must contain only letters."
        }
      ],
      profession: [
        {
          type: "maxlength",
          message: "Profession cannot be more than 100 characters long."
        },
        {
          type: "pattern",
          message: "Profession must contain only letters."
        }
      ],
      religion: [
        {
          type: "maxlength",
          message: "Religion cannot be more than 100 characters long."
        },
        {
          type: "pattern",
          message: "Religion must contain only letters."
        }
      ],
      tin: [
        {
          type: "maxlength",
          message: "Tin cannot be more than 100 characters long."
        }
      ],
      sss: [
        {
          type: "maxlength",
          message: "SSS cannot be more than 100 characters long."
        }
      ],
      height: [
        {
          type: "number",
          message: "Height must contain a number in cm."
        }
      ],
      weight: [
        {
          type: "number",
          message: "Weight must contain a number in kg."
        }
      ],
      phoneno: [
        {
          type: "maxlength",
          message: "Phone No. cannot be more than 10 characters long."
        },
        {
          type: "pattern",
          message: "Phone No. must contain only numbers."
        }
      ],
      mobileno: [
        { type: "required", message: "Mobile Number is required." },
        {
          type: "maxlength",
          message: "Mobile No. cannot be more than 10 characters long."
        },
        {
          type: "pattern",
          message: "Mobile No. must contain only numbers."
        }
      ],
      email: [
        {
          type: "pattern",
          message: "Email must be valid."
        }
      ],
      province: [{ type: "required", message: "Province is required." }],
      municipality: [
        { type: "required", message: "Municipality is required." }
      ],
      barangay: [{ type: "required", message: "Barangay is required." }],
      street: [
        { type: "required", message: "Street/Purok is required." },
        {
          type: "maxlength",
          message: "Street cannot be more than 100 characters long."
        }
      ]
    };

    this.getProvinces().subscribe(result => {
      this.provinces = result['RECORDS'];
      this.provinces = this.provinces.sort((a, b) =>
        a.lguname > b.lguname ? 1 : -1
      );
    });

    // this.getBarangays().subscribe(result => {
    //   this.barangays = result['RECORDS'];
    //   this.barangays = this.barangays.sort((a, b) =>
    //     a.lguname > b.lguname ? 1 : -1
    //   );
    // });

    // this.getMunicipalities().subscribe(result => {
    //   this.municipalities = result['RECORDS'];
    //   this.municipalities = this.municipalities.sort((a, b) =>
    //     a.lguname > b.lguname ? 1 : -1
    //   );
    // });

   
  }

  private getBarangays(): Observable<any[]> {
    return this.httpClient.get<any>("assets/psgcbarangay.json");
  }

  private getMunicipalities(): Observable<any[]> {
    return this.httpClient.get<any[]>("assets/psgcmuncity.json");
  }

  private getProvinces(): Observable<any[]> {
    return this.httpClient.get<any[]>("assets/psgcprov.json");
  }



  ngOnInit() {
    this.mode = "create";
    this.matches = [];
   
  }

  next() {
    this.isSubmitted = true;
    this.personProfileSlider.getActiveIndex().then(index => {

      if (this.personInformationForm.valid && index === 0) {
        if (this.mode === "create") {
          // this.verifyfarmername();
        }
        this.nextslide();
      } else if (index === 1) {
          this.nextslide();
      } else {
        this.showToast("Form validation error.");
      }
    });
  }

  nextslide() {
    this.personProfileSlider.lockSwipes(false);
    this.personProfileSlider.slideNext();
    this.personProfileSlider.lockSwipes(true);
    this.personProfileSlider.lockSwipeToNext(true);
    this.personProfileSlider.lockSwipeToPrev(false);
  }
  prev() {
    this.personProfileSlider.slidePrev();
  }

  slideChanged() {
    this.personProfileSlider.isEnd().then(istrue => {
      this.isend = istrue;
    });
    this.personProfileSlider.isBeginning().then(istrue => {
      this.isbeginning = istrue;
    });
  }

  slideLoad() {
    this.personProfileSlider.update();
    this.personProfileSlider.lockSwipes(true);
    this.personProfileSlider.isBeginning().then(istrue => {
      this.isbeginning = istrue;
    });
  }

  save() {
    if (this.personInformationForm.valid) {
      this.saveprofile();
    } else {
      this.showToast("Form validation error.");
    }
  }
  updatePolicyAgree() {
    console.log(this.ispolicyagree);
  }
  
  async onProvinceChange() {
    let province = this.personInformationForm.get("province").value;
    if (province.code){
      await this.getMunicipalities().subscribe(async result => {
        this.loading = await this.loadingController.create({});
        await this.loading.present();
        this.municipalities = await result['RECORDS'].filter(o => o.parentid === province.code);
        if (this.municipalities) {
          if (this.loading) {
            await this.loading.dismiss();
            this.loading = null;
          }
        }
        this.municipalities = await this.municipalities.sort((a, b) =>
          a.lguname > b.lguname ? 1 : -1
        );
      });
    }
  }

  async onMunicipalityChange() {
    let municipality = this.personInformationForm.get("municipality").value;
    if (municipality.code){
      await this.getBarangays().subscribe(async result => {
        this.loading = await this.loadingController.create({});
        await this.loading.present();
        this.barangays = await result['RECORDS'].filter(o => o.parentid === municipality.code);
        if (this.barangays) {
          if (this.loading) {
            await this.loading.dismiss();
            this.loading = null;
          }
        }
        this.barangays = await this.barangays.sort((a, b) =>
          a.lguname > b.lguname ? 1 : -1
        );
      });
    }
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });

    toast.present();
  }

  async ionViewDidEnter() {
    this.viewEntered = true;
    
    const objid = this.route.snapshot.paramMap.get("objid");
    this.defaultHref =
      `/qrprofilelist`;
    if (objid) {
      this.mode = "edit";
      await this.qrcodesvc.getItem(objid).then(async item => {
        // console.log(JSON.stringify(item));
        await this.personInformationForm.patchValue(item);
        await this.getMunicipalities().subscribe(result => {
          this.municipalities = result['RECORDS'].filter(o => o.parentid === item.address.province.code);
          this.municipalities = this.municipalities.sort((a, b) =>
            a.lguname > b.lguname ? 1 : -1
          );
          this.personInformationForm.patchValue({
            municipality: { code: item.address.municipality.code}
          });
        });
        await this.getBarangays().subscribe(result => {
          this.barangays = result['RECORDS'].filter(o => o.parentid === item.address.municipality.code);
          this.barangays = this.barangays.sort((a, b) =>
            a.lguname > b.lguname ? 1 : -1
          );
          this.personInformationForm.patchValue({
            barangay: { code: item.address.barangay.code}
          });
        });

        await this.personInformationForm.patchValue(item.address);
        
        this.person = item;
        this.photo = item.photo;
      });
    }
  }

  saveprofile() {

    try {
      let profiletoadd = {
        ...this.personInformationForm.value,
      };
      profiletoadd.objid = this.person ? this.person.objid : this.create_UUID();
      if (profiletoadd.nameextension || profiletoadd.nameextension !== ''){
        profiletoadd.lastname = profiletoadd.lastname + ' ' + profiletoadd.nameextension
      }
      profiletoadd.address = this.personInformationForm.value;
      profiletoadd.address.barangay.lguname = this.barangays.find(
        o => o.code === profiletoadd.address.barangay.code
      ).lguname;

      profiletoadd.address.municipality.lguname = this.municipalities.find(
        o => o.code === profiletoadd.address.municipality.code
      ).lguname;

      profiletoadd.address.province.lguname = this.provinces.find(
        o => o.code === profiletoadd.address.province.code
      ).lguname;

      // console.log(profiletoadd);

      profiletoadd.address.text =
      (profiletoadd.address.street
        ? profiletoadd.address.street + " "
        : "") +
      " " +
      this.barangays.find(
        o => o.code === profiletoadd.address.barangay.code
      ).lguname +
      ", " +
      this.municipalities.find(
        o => o.code === profiletoadd.address.municipality.code
      ).lguname +
      " " +
      this.provinces.find(
        o => o.code === profiletoadd.address.province.code
      ).lguname;
      
      profiletoadd.photo = this.photo

      if (this.mode === "create"){
        
        this.qrcodesvc.addItem(profiletoadd).then(item => {
          this.showToast("Profile Saved");
          this.router.navigate([
            "/qrprofilelist"
          ]);
        });
      }  else {
        this.qrcodesvc.updateItem(profiletoadd).then(item => {
          this.showToast("Profile Saved");
          this.router.navigate([
            "/qrprofilelist"
          ]);
        });
      }
    
    } catch (e) {
      console.log("error on save");
      this.showToast("Error in saving Person Profile.");
    }
  }


  create_UUID() {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
      c
    ) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }

  async selectImage() {
    try {
      const profilePicture = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });
      this.photo = profilePicture.dataUrl;
    } catch (error) {
      console.error(error);
    }
  }
}

