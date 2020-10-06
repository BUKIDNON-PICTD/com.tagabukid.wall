import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap,map , catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CoviddataService {

  constructor(
    private http: HttpClient,
    private alertController: AlertController
  ) { }

 
  getCovidData(): Promise<any[]> {
    let headers = new HttpHeaders({
      "Authorization": "Basic "+ btoa("covidviewer:covidviewer"),
      "Content-Type":  "application/json",
    });

    let apiurl = `https://geoserver.bukidnon.gov.ph/geoserver/pgb/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pgb%3Abukidnoncovid19_view_summary&maxFeatures=50&outputFormat=application%2Fjson`
    return this.http.get<any>(apiurl, {
      headers: headers,
      withCredentials: true
    }).pipe(
      map(res => res.features),
      tap(res => {
        return res;
      }),
      catchError((e) => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    ).toPromise();
  }

  getCovidDataByMunicipality(): Promise<any[]> {
    let headers = new HttpHeaders({
      "Authorization": "Basic "+ btoa("covidviewer:covidviewer"),
      "Content-Type":  "application/json",
    });

    let apiurl = `https://geoserver.bukidnon.gov.ph/geoserver/pgb/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pgb%3Abukidnoncovid19_view_by_municipality_summary&maxFeatures=50&outputFormat=application%2Fjson`
    return this.http.get<any>(apiurl, {
      headers: headers,
      withCredentials: true
    }).pipe(
      map(res => res.features),
      tap(res => {
        return res;
      }),
      catchError((e) => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    ).toPromise();
  }

  getCovidDataAgeGroup(): Promise<any[]> {
    let headers = new HttpHeaders({
      "Authorization": "Basic "+ btoa("covidviewer:covidviewer"),
      "Content-Type":  "application/json",
    });

    let apiurl = `https://geoserver.bukidnon.gov.ph/geoserver/pgb/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pgb%3Abukidnoncovid19_view_agegroup_summary&maxFeatures=50&outputFormat=application%2Fjson&viewparams=MUNCITY:`;
    return this.http.get<any>(apiurl, {
      headers: headers,
      withCredentials: true
    }).pipe(
      map(res => res.features),
      tap(res => {
        return res;
      }),
      catchError((e) => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    ).toPromise();
  }

  getCovidDataAgeGroupByMunicipality(municipality): Promise<any[]> {
    let headers = new HttpHeaders({
      "Authorization": "Basic "+ btoa("covidviewer:covidviewer"),
      "Content-Type":  "application/json",
    });

    let apiurl = `https://geoserver.bukidnon.gov.ph/geoserver/pgb/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pgb%3Abukidnoncovid19_view_agegroup_summary&maxFeatures=50&outputFormat=application%2Fjson`;
    apiurl += `&viewparams=MUNCITY:` + municipality;
    return this.http.get<any>(apiurl, {
      headers: headers,
      withCredentials: true
    }).pipe(
      map(res => res.features),
      tap(res => {
        return res;
      }),
      catchError((e) => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    ).toPromise();
  }

  getCovidMunicipalityDashboard(municipality): Promise<any[]> {
    let headers = new HttpHeaders({
      "Authorization": "Basic "+ btoa("covidviewer:covidviewer"),
      "Content-Type":  "application/json",
    });
 
    let apiurl = `https://geoserver.bukidnon.gov.ph/geoserver/pgb/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pgb%3Abukidnoncovid19_view_municipality_dashboard&outputFormat=application%2Fjson`;
    apiurl += `&viewparams=MUNCITY:` + municipality + `;STARTDATE:2020-04-01`;
    return this.http.get<any>(apiurl, {
      headers: headers,
      withCredentials: true
    }).pipe(
      map(res => res.features),
      tap(res => {
        return res;
      }),
      catchError((e) => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    ).toPromise();
  }

  getCovidProvinceDashboard(): Promise<any[]> {
    let headers = new HttpHeaders({
      "Authorization": "Basic "+ btoa("covidviewer:covidviewer"),
      "Content-Type":  "application/json",
    });
 
    let apiurl = `https://geoserver.bukidnon.gov.ph/geoserver/pgb/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pgb%3Abukidnoncovid19_view_municipality_dashboard&outputFormat=application%2Fjson`;
    apiurl += `&viewparams=MUNCITY:;STARTDATE:2020-04-01`;
    return this.http.get<any>(apiurl, {
      headers: headers,
      withCredentials: true
    }).pipe(
      map(res => res.features),
      tap(res => {
        return res;
      }),
      catchError((e) => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    ).toPromise();
  }

  getCases(): Promise<any[]> {
    let headers = new HttpHeaders({
      "Authorization": "Basic "+ btoa("covidviewer:covidviewer"),
      "Content-Type":  "application/json",
    });
 
    let apiurl = `https://geoserver.bukidnon.gov.ph/geoserver/pgb/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pgb%3Abukidnoncovid19view&outputFormat=application%2Fjson`;
    return this.http.get<any>(apiurl, {
      headers: headers,
      withCredentials: true
    }).pipe(
      map(res => res.features),
      tap(res => {
        return res;
      }),
      catchError((e) => {
        this.showAlert(e.error.msg);
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