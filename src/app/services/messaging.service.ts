import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { AngularFireMessaging } from "@angular/fire/messaging";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class MessagingService {
  token: null;

  constructor(private afMessaging: AngularFireMessaging,private http: HttpClient,) {}

  requestPermission() {
    return this.afMessaging.requestToken.pipe(
      tap((token) => {
        // console.log("Store token to server: ", token);
        let newtoken = {
          push_access_token : token
        }
        this.addItem(newtoken)
      })
    );
  }

  getMessages() {
    return this.afMessaging.messages;
  }

  deleteToken() {
    if (this.token) {
      this.afMessaging.deleteToken(this.token);
      this.token = null;
    }
  }

  async addItem(item: any): Promise<any> {
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
}
