import { SettingsService } from "src/app/services/settings.service";
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

  async addItem(item: any): Promise<any> {
    await this.settingservice.getItems().then((items) => {
      item.locationid = items[0].locationid;
      item.deviceid = items[0].objid;
    });
    return await this.http
      .post(`${this.apiurl}/api/qrlogs/`, item)
      .pipe(
        tap((res) => {
          let toast = this.toastController.create({
            message: `Successfully logged to server.`,
            duration: 2000,
            position: "bottom",
          });
          toast.then((toast) => toast.present());
          this.qrofflinelogservice.deleteItem(item);
          return res;
        }),
        catchError((e) => {
          if (e.error === 'Location ID not found.'){
            this.qrofflinelogservice.addItem(item);
            let toast = this.toastController.create({
              message: `Invalid Location ID. Please Contact System Administrator.`,
              duration: 3000,
              position: "bottom",
            });
            toast.then((toast) => toast.present());
          } else {
            this.qrofflinelogservice.addItem(item);
            let toast = this.toastController.create({
              message: `Unable to sync data online. Successfully logged to local storage.`,
              duration: 2000,
              position: "bottom",
            });
            toast.then((toast) => toast.present());
          }
         
          throw new Error(e);
        })
      )
      .toPromise();
  }
}
