import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PushnotificationService {

  constructor(private http: HttpClient) { }

  public sendSubscriptionToTheServer(subscription: PushSubscription) {
    return this.http.post(`${environment.panganud}/api/covid19subscriber/subscribe2`, subscription);
  }
}
