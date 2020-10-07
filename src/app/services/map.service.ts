import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { tap, map , catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private http: HttpClient,
    private alertController: AlertController
  ) { }

  getMunicipalBrdy(): Promise<any[]> {
    let headers = new HttpHeaders({
      "Authorization": "Basic "+ btoa("covidviewer:covidviewer"),
      "Content-Type":  "application/json",
    });

    let apiurl = `https://geoserver.bukidnon.gov.ph/geoserver/pgb/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pgb%3AMunicipalBdry&maxFeatures=50&outputFormat=application%2Fjson`
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
    ).toPromise();
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
