import { AlertController } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VaccinesurveydashboardService {

  constructor(
    public http: HttpClient,
    public alertController: AlertController
  ) {}

  getItems(): Promise<any> {
    return this.http
      .get<any>(`${environment.panganud}/api/vaccinesurveydashboard/gettotals`)
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

  getItem(id): Promise<any> {
    return this.http
      .get<any>(`${environment.panganud}/api/vaccinesurveydashboard/` + id)
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

  addItem(item: any): Promise<any> {
    return this.http
      .post(`${environment.panganud}/api/vaccinesurveydashboard/`, item)
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
    return this.http
      .put(`${environment.panganud}/api/vaccinesurveydashboard/` + item.id, item)
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

  deleteItem(id: any): Promise<any> {
    return this.http
      .delete(`${environment.panganud}/api/vaccinesurveydashboard/` + id)
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

  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: "Error",
      buttons: ["OK"],
    });
    alert.then((alert) => alert.present());
  }
}