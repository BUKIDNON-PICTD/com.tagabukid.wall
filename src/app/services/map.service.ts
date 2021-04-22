import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { tap, map , catchError } from 'rxjs/operators';
import { Storage } from "@ionic/storage";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private toastController: ToastController,
    private storage: Storage
  ) { }

  MunicipalBdry(): Promise<any> {
    return new Promise((resolve) => {
      this.storage.get("MunicipalBdry").then((items) => {
        if (items) {
          resolve(items);
        }else {
          this.getMunicipalBrdy().subscribe((next) => {
            this.storage.set("MunicipalBdry", next);
            resolve(next);
          });
        }
      });
    });
  }
  getMunicipalBrdy(): Observable<any[]> {
    let headers = new HttpHeaders({
      "Authorization": "Basic "+ btoa("covidviewer:covidviewer"),
      "Content-Type":  "application/json",
    });

    let apiurl = `${environment.geoserver}/geoserver/covid19/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=covid19%3AMunicipalBdry&maxFeatures=50&outputFormat=application%2Fjson`
    return this.http.get<any>(apiurl, {
      headers: headers,
      withCredentials: true
    }).pipe(
      // map(res => res.features),
      tap(res => {
        return res;
      }),
      catchError((e) => {
        let toast = this.toastController.create({
          message: `Unable to download data from the server.`,
          duration: 3000,
          position: "bottom",
        });
        toast.then((toast) => toast.present());
        throw new Error(e);
      })
    );
  }
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: "Error",
      buttons: ["OK"],
    });
    alert.then((alert) => alert.present());
  }
}
