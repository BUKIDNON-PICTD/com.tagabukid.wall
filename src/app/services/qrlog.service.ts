import { SettingsService } from 'src/app/services/settings.service';
import { QrofflinelogService } from "./qrofflinelog.service";
import { OfflinemanagerService } from "./offlinemanager.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class QrlogService {
  constructor(
    private http: HttpClient,
    private qrofflinelogservice: QrofflinelogService,
    private toastController: ToastController,
    private settingservice: SettingsService
  ) {}
  apiurl = "https://panganud.bukidnon.gov.ph";

  addItem(item: any): Promise<any> {
   return this.http
      .post(`${this.apiurl}/api/qrlogs/`, item)
      .pipe(
        tap((res) => {
          let toast = this.toastController.create({
            message: `Successfully logged to server.`,
            duration: 2000,
            position: 'bottom'
          });
          toast.then(toast => toast.present());
          return res;
        }),
        catchError((e) => {
          this.qrofflinelogservice.addItem(item);
          let toast = this.toastController.create({
            message: `Successfully logged to local storage.`,
            duration: 2000,
            position: 'bottom'
          });
          toast.then(toast => toast.present());
          throw new Error(e);
        })
      )
      .toPromise();
  }

 
}
