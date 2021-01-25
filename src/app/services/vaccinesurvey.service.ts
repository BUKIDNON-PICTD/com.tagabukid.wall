import { AlertController } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { VaccinesurveyofflineService } from "./vaccinesurveyoffline.service";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root",
})
export class VaccinesurveyService {
  constructor(
    public http: HttpClient,
    public alertController: AlertController,
    private vaccineSurveyOfflineService: VaccinesurveyofflineService,
    private storage: Storage
  ) {}

  getItems(): Promise<any[]> {
    return this.http
      .get<any>(`${environment.panganud}/api/vaccinesurvey`)
      .pipe(
        tap((res) => {
          return res;
        }),
        catchError((e) => {
          this.showAlert(e.error.msg);
          throw new Error(e);
        })
      )
      .toPromise();
  }

  getItem(objid): Promise<any> {
    return this.http
      .get<any>(`${environment.panganud}/api/vaccinesurvey/` + objid)
      .pipe(
        tap((res) => {
          return res;
        }),
        catchError((e) => {
          this.showAlert(e.error.msg);
          throw new Error(e);
        })
      )
      .toPromise();
  }

  addSurvey(item: any): Promise<any> {
    this.storage.get("vaccinesurvey").then(items => {
      if (!items || items.length === 0) {
        return null;
      }
      let newItems: any[] = [];

      for (let i of items) {
        console.log(`${i.objid} saved to local storage.`);
        if (i.objid == item.objid) {
          newItems.push(item);
        } else {
          newItems.push(i);
        }
      }
      return this.storage.set("vaccinesurvey", newItems);
    });

    return this.http
      .post(`${environment.panganud}/api/vaccinesurvey/`, item)
      .pipe(
        tap((res) => {
          this.vaccineSurveyOfflineService.deleteItem(item);
          return res;
        }),
        catchError((e) => {
          this.vaccineSurveyOfflineService.addItem(item);
          this.showAlert(e.error.msg);
          throw new Error(e);
        })
      )
      .toPromise();
  }

  addItem(item: any): Promise<any> {
    const surveyItem = {
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
      answer: item.answer,
      reason: item.reason
    }
    
    this.storage.get("personprofile").then(items => {
      if (!items || items.length === 0) {
        return null;
      }
      let newItems: any[] = [];

      for (let i of items) {
        console.log(`${i.objid} saved to local storage.`);
        if (i.objid == item.objid) {
          newItems.push(item);
        } else {
          newItems.push(i);
        }
      }
      this.storage.set("personprofile", newItems);
    });
    return this.addSurvey(surveyItem);
  }

  updateSurvey(item) { 
    this.storage.get("vaccinesurvey").then(items => {
      if (!items || items.length === 0) {
        return null;
      }
      let newItems: any[] = [];

      for (let i of items) {
        console.log(`${i.objid} saved to local storage.`);
        if (i.objid == item.objid) {
          newItems.push(item);
        } else {
          newItems.push(i);
        }
      }
      return this.storage.set("vaccinesurvey", newItems);
    });

    return this.http
      .put(`${environment.panganud}/api/vaccinesurvey/` + item.objid, item)
      .pipe(
        tap((res) => {
          return res;
        }),
        catchError((e) => {
          this.showAlert(e.error.msg);
          throw new Error(e);
        })
      )
      .toPromise();
  }

  updateItem(item: any): Promise<any> {
    const surveyItem = {
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
      answer: item.answer,
      reason: item.reason
    }
    
    this.storage.get("personprofile").then(items => {
      if (!items || items.length === 0) {
        return null;
      }
      let newItems: any[] = [];

      for (let i of items) {
        console.log(`${i.objid} is saved to local storage.`);
        if (i.objid == item.objid) {
          newItems.push(item);
        } else {
          newItems.push(i);
        }
      }
      this.storage.set("personprofile", newItems);
    });
    return this.updateSurvey(surveyItem);
  }

  deleteItem(id: any): Promise<any> {
    return this.http
      .delete(`${environment.panganud}/api/vaccinesurvey/` + id)
      .pipe(
        tap((res) => {
          return res;
        }),
        catchError((e) => {
          this.showAlert(e.error.msg);
          throw new Error(e);
        })
      )
      .toPromise();
  }

  // showAlert(msg) {
  //   let alert;
  //   msg === "alreadyExist" ?
  //   alert = this.alertController.create({
  //   message: "Survey data already exist.",
  //   header: "Error",
  //   buttons: ["OK"],
  //   }) :
  //   alert = this.alertController.create({
  //     message: msg,
  //     header: "Error",
  //     buttons: ["OK"],
  //   });
  //   alert.then((alert) => alert.present());
  // }
  
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: "Error",
      buttons: ["OK"],
    });
    alert.then((alert) => alert.present());
  }
}
