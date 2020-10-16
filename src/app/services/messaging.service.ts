import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { AngularFireMessaging } from "@angular/fire/messaging";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class MessagingService {
  token: any;

  constructor(private afMessaging: AngularFireMessaging, private http: HttpClient) {}

  requestPermission() {
    return this.afMessaging.requestToken.pipe(
      tap((token) => {
        this.token = token;
      })
    );
  }
 
  getMessages() {
    return this.afMessaging.messages;
  }

  deleteToken() {
    if (this.token) {
      this.afMessaging.deleteToken(this.token);
      this.unsubscribe({push_access_token : this.token});
      this.token = null;
    }
  }

  async subscribe(item: any): Promise<any> {
    return await this.http
      .post(`${environment.panganud}/api/covid19subscriber/subscribe`, item)
      .pipe(
        tap((res) => {
          return res;
        }),
        catchError((e) => {
          throw new Error(e);
        })
      )
      .toPromise();
  }

  async unsubscribe(item: any): Promise<any> {
    return await this.http
      .post(`${environment.panganud}/api/covid19subscriber/unsubscribe`, item)
      .pipe(
        tap((res) => {
          return res;
        }),
        catchError((e) => {
          throw new Error(e);
        })
      )
      .toPromise();
  }

  checkSubscriptionStatus(item: any): Promise<any> {
    return this.http
      .post(`${environment.panganud}/api/covid19subscriber/checksubscriptionstatus`, item)
      .pipe(
        tap((res) => {
          return res;
        }),
        catchError((e) => {
          throw new Error(e);
        })
      )
      .toPromise();
  }
}
