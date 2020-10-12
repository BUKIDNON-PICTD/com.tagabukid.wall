import { QrofflinelogService } from './qrofflinelog.service';
import { QrlogService } from './qrlog.service';
import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { Storage } from "@ionic/storage";
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';

interface StoredRequest {
  url: string;
  type: string;
  data: any;
  time: number;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class OfflinemanagerService {
  constructor(
    private storage: Storage,
    private toastController: ToastController,
    private http: HttpClient,
    private qrlogsvc : QrlogService,
    private qrofflinelogsvc : QrofflinelogService,

    ) {}


  syncQRLogs() {
    this.qrofflinelogsvc.getItems().then( items => {
      if (items){
        //startsync
        items.forEach( item => {
          this.qrlogsvc.addItem(item);
        });
      }
    });
  }
}
