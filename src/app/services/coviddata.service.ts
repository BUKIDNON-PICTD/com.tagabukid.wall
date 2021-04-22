import { environment } from "src/environments/environment";
import { ToastController } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap, map, catchError } from "rxjs/operators";
import { AlertController } from "@ionic/angular";
import { BehaviorSubject, Observable } from "rxjs";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root",
})
export class CoviddataService {
  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private toastController: ToastController,
    private storage: Storage
  ) {}
  private latestdate: any;

  bukidnoncovid19_view_summary(): Promise<any> {
    return new Promise((resolve) => {
      this.bukidnoncovid19_view_summary_online().subscribe((next) => {
        this.storage.set("bukidnoncovid19_view_summary", next);
        resolve(next);
      }, (error) => {
        this.storage.get("bukidnoncovid19_view_summary").then((items) => {
          if (items) {
            resolve(items);
          }
        });
      });
    });
  }

  bukidnoncovid19_view_summary_online(): Observable<any[]> {
    let headers = new HttpHeaders({
      Authorization: "Basic " + btoa("covidviewer:covidviewer"),
      "Content-Type": "application/json",
    });

    let apiurl = `${environment.geoserver}/geoserver/covid19/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=covid19%3Abukidnoncovid19_view_summary&maxFeatures=50&outputFormat=application%2Fjson`;
    return this.http
      .get<any>(apiurl, {
        headers: headers,
        withCredentials: true,
      })
      .pipe(
        map((res) => res.features),
        tap((res) => {
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

  bukidnoncovid19_view_by_municipality_summary(): Promise<any> {
    return new Promise((resolve) => {
      this.bukidnoncovid19_view_by_municipality_summary_online().subscribe((next) => {
        this.storage.set("bukidnoncovid19_view_by_municipality_summary", next);
        resolve(next);
      }, (error) => {
        this.storage.get("bukidnoncovid19_view_by_municipality_summary").then((items) => {
          if (items) {
            resolve(items);
          }
        });
      });
    });
  }

  bukidnoncovid19_view_by_municipality_summary_online(): Observable<any[]> {
    let headers = new HttpHeaders({
      Authorization: "Basic " + btoa("covidviewer:covidviewer"),
      "Content-Type": "application/json",
    });

    let apiurl = `${environment.geoserver}/geoserver/covid19/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=covid19%3Abukidnoncovid19_view_by_municipality_summary&maxFeatures=50&outputFormat=application%2Fjson`;
    return this.http
      .get<any>(apiurl, {
        headers: headers,
        withCredentials: true,
      })
      .pipe(
        map((res) => res.features),
        tap((res) => {
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

  bukidnoncovid19_view_agegroup_summary(): Promise<any> {
    return new Promise((resolve) => {
      this.bukidnoncovid19_view_agegroup_summary_online().subscribe((next) => {
        this.storage.set("bukidnoncovid19_view_agegroup_summary", next);
        resolve(next);
      }, (error) => {
        this.storage.get("bukidnoncovid19_view_agegroup_summary").then((items) => {
          if (items) {
            resolve(items);
          }
        });
      });
    });
  }

  bukidnoncovid19_view_agegroup_summary_online(): Observable<any[]> {
    let headers = new HttpHeaders({
      Authorization: "Basic " + btoa("covidviewer:covidviewer"),
      "Content-Type": "application/json",
    });

    let apiurl = `${environment.geoserver}/geoserver/covid19/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=covid19%3Abukidnoncovid19_view_agegroup_summary&maxFeatures=50&outputFormat=application%2Fjson&viewparams=MUNCITY:`;
    return this.http
      .get<any>(apiurl, {
        headers: headers,
        withCredentials: true,
      })
      .pipe(
        map((res) => res.features),
        tap((res) => {
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

  bukidnoncovid19_view_agegroup_summary_municipality(municipality): Promise<any> {
    return new Promise((resolve) => {
      this.bukidnoncovid19_view_agegroup_summary_municipality_online(municipality).subscribe((next) => {
        this.storage.set("bukidnoncovid19_view_agegroup_summary_municipality", next);
        resolve(next);
      }, (error) => {
        this.storage.get("bukidnoncovid19_view_agegroup_summary_municipality").then((items) => {
          if (items) {
            resolve(items);
          }
        });
      });
    });
  }

  bukidnoncovid19_view_agegroup_summary_municipality_online(municipality): Observable<any[]> {
    let headers = new HttpHeaders({
      Authorization: "Basic " + btoa("covidviewer:covidviewer"),
      "Content-Type": "application/json",
    });

    let apiurl = `${environment.geoserver}/geoserver/covid19/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=covid19%3Abukidnoncovid19_view_agegroup_summary&maxFeatures=50&outputFormat=application%2Fjson`;
    apiurl += `&viewparams=MUNCITY:` + municipality;
    return this.http
      .get<any>(apiurl, {
        headers: headers,
        withCredentials: true,
      })
      .pipe(
        map((res) => res.features),
        tap((res) => {
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

  bukidnoncovid19_view_municipality_dashboard(municipality): Promise<any> {
    return new Promise((resolve) => {
      this.bukidnoncovid19_view_municipality_dashboard_online(municipality).subscribe((next) => {
        this.storage.set("bukidnoncovid19_view_municipality_dashboard", next);
        resolve(next);
      }, (error) => {
        this.storage.get("bukidnoncovid19_view_municipality_dashboard").then((items) => {
          if (items) {
            resolve(items);
          }
        });
      });
    });
  }
  
  bukidnoncovid19_view_municipality_dashboard_online(municipality): Observable<any[]> {
    let headers = new HttpHeaders({
      Authorization: "Basic " + btoa("covidviewer:covidviewer"),
      "Content-Type": "application/json",
    });

    let apiurl = `${environment.geoserver}/geoserver/covid19/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=covid19%3Abukidnoncovid19_view_municipality_dashboard&outputFormat=application%2Fjson`;
    apiurl += `&viewparams=MUNCITY:` + municipality + `;STARTDATE:2020-04-01`;
    return this.http
      .get<any>(apiurl, {
        headers: headers,
        withCredentials: true,
      })
      .pipe(
        map((res) => res.features),
        tap((res) => {
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
  
 bukidnoncovid19_view_province_dashboard(): Promise<any> {
    return new Promise(async (resolve) => {
      this.latestdate = "2020-04-01";
      await this.storage.get("bukidnoncovid19_view_province_dashboard_date").then((item) => {
        if (item) {
          this.latestdate = item;
        }
      });
      
      await this.bukidnoncovid19_view_province_dashboard_online(this.latestdate).subscribe((next) => {
        this.storage.get("bukidnoncovid19_view_province_dashboard").then((items) => {
          if (items) {
            items.pop();
            next.forEach((x) => {
              items.push(x);
            });
            this.storage.set("bukidnoncovid19_view_province_dashboard", items);
            this.storage.set("bukidnoncovid19_view_province_dashboard_date", items[items.length - 1].properties.selected_date);
            resolve(items);
          } else {
            this.storage.set("bukidnoncovid19_view_province_dashboard", next);
            this.storage.set("bukidnoncovid19_view_province_dashboard_date", next[next.length - 1].properties.selected_date);
            resolve(next);
          }
        });
      }, (error) => {
        this.storage.get("bukidnoncovid19_view_province_dashboard").then((items) => {
          if (items) {
            resolve(items);
          }
        });
      });
    });
  }

  bukidnoncovid19_view_province_dashboard_online(latestdate): Observable<any[]> {
    
    let headers = new HttpHeaders({
      Authorization: "Basic " + btoa("covidviewer:covidviewer"),
      "Content-Type": "application/json",
    });

    let apiurl = `${environment.geoserver}/geoserver/covid19/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=covid19%3Abukidnoncovid19_view_municipality_dashboard&outputFormat=application%2Fjson`;
    apiurl += `&viewparams=MUNCITY:;STARTDATE:${latestdate}`;

    return this.http
      .get<any>(apiurl, {
        headers: headers,
        withCredentials: true,
      })
      .pipe(
        map((res) => res.features),
        tap((res) => {
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

  bukidnoncovid19_view(): Promise<any> {
    return new Promise((resolve) => {
      this.bukidnoncovid19_view_online().subscribe((next) => {
        this.storage.set("bukidnoncovid19_view", next);
        resolve(next);
      }, (error) => {
        this.storage.get("bukidnoncovid19_view").then((items) => {
          if (items) {
            resolve(items);
          }
        });
      });
    });
  }

  bukidnoncovid19_view_online(): Observable<any[]> {
    let headers = new HttpHeaders({
      Authorization: "Basic " + btoa("covidviewer:covidviewer"),
      "Content-Type": "application/json",
    });

    let apiurl = `${environment.geoserver}/geoserver/covid19/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=covid19%3Abukidnoncovid19_view&outputFormat=application%2Fjson`;
    return this.http
      .get<any>(apiurl, {
        headers: headers,
        withCredentials: true,
      })
      .pipe(
        map((res) => res.features),
        tap((res) => {
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
