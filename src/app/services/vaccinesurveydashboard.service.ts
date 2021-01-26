import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class VaccinesurveydashboardService {

  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private storage: Storage,
    ) { }

  bukidnoncovid19_vaxx_total(): Promise<any> {
    return new Promise((resolve) => {
      this.bukidnoncovid19_vvaxx_total_online().subscribe((next) => {
        this.storage.set("bukidnoncovid19_vaxx_total", next);
        resolve(next);
        
      }, (error) => {
        this.storage.get("bukidnoncovid19_vaxx_total").then((items) => {
          if (items) {
            resolve(items);
          }
        });
      });
    });
  }  

  bukidnoncovid19_vvaxx_total_online(): Observable<any[]> {
    // let headers = new HttpHeaders({
    //   Authorization: "Basic " + btoa("covidviewer:covidviewer"),
    //   "Content-Type": "application/json",

    // });

    let apiurl = `${environment.panganud}/api/vaccinesurveydashboard/gettotals`;
    return this.http
      .get<any>(apiurl, {
        // headers: headers,
        // withCredentials: true,
      })
      .pipe(
        map(res => res),
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


  // =========================================
  
  // Total Age Range 
  bukidnoncovid19_vaxx_age_summary(): Promise<any> {
    return new Promise((resolve) => {
      this.bukidnoncovid19_vaxx_age_summary_online().subscribe((next) => {
        this.storage.set("bukidnoncovid19_vaxx_total_age", next);
        resolve(next);
        
      }, (error) => {
        this.storage.get("bukidnoncovid19_vaxx_total_age").then((items) => {
          if (items) {
            resolve(items);
          }
        });
      });
    });
  }  

  bukidnoncovid19_vaxx_age_summary_online(): Observable<any[]> {
    // let headers = new HttpHeaders({
    //   Authorization: "Basic " + btoa("covidviewer:covidviewer"),
    //   "Content-Type": "application/json",

    // });

    let apiurl = `${environment.panganud}/api/vaccinesurveydashboard/gettotalsage`;
    return this.http
      .get<any>(apiurl, {
        // headers: headers,
        // withCredentials: true,
      })
      .pipe(
        map(res => res),
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
}
