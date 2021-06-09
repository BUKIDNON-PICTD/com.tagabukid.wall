import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PrevacService {

  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) {}

  async addItem(item: any): Promise<any> {
    return await this.http
      .post(`${environment.panganud}/api/prevac/`, item)
      .pipe(
        tap((res) => {
          let toast = this.toastController.create({
            message: `Successfully registered to server.`,
            duration: 2000,
            position: "bottom",
          });
          toast.then((toast) => toast.present());
          return res;
        }),
        catchError((e) => {
          this.presentAlert(e);
          // let toast = this.toastController.create({
          //   message: `Unable to sync data online. Successfully logged to local storage.`,
          //   duration: 2000,
          //   position: "bottom",
          // });
          // toast.then((toast) => toast.present());
         
          throw new Error(e);
        })
      )
      .toPromise();
  }

  async presentAlert(e) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Registration Failed',
      message: e.error,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.router.navigate([
                "/dashboard"
              ]);
          }
        }
      ]
    });

    await alert.present();
  }
}
