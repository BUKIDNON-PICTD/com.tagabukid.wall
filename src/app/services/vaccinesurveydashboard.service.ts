import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VaccinesurveydashboardService {

  constructor(
    public http: HttpClient,
    public toastController: ToastController
  ) { }

  getTotals(): Promise<any[]> {
    return this.http
      .get<any>(`${environment.panganud}/api/vaccinesurveydashboard/gettotals`)
      .pipe(
        tap((res) => {
          return res;
        }),
        catchError((e) => {
          let toast = this.toastController.create({
            message: e.error.message,
            duration: 2000,
            position: "bottom",
          });
          toast.then((toast) => toast.present());
          throw new Error(e);
        })
      )
      .toPromise();
  }

  
}
