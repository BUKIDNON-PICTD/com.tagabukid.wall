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
    private http: HttpClient
    ) {}
  settings = new BehaviorSubject<any[]>(null);

  // checkForEvents(): Observable<any> {
  //   return from(this.storage.get('offlinedata')).pipe(
  //     switchMap(storedOperations => {
  //       let storedObj = JSON.parse(storedOperations);
  //       if (storedObj && storedObj.length > 0) {
  //         return this.sendRequests(storedObj).pipe(
  //           finalize(() => {
  //             let toast = this.toastController.create({
  //               message: `Local data succesfully synced to API!`,
  //               duration: 3000,
  //               position: 'bottom'
  //             });
  //             toast.then(toast => toast.present());
 
  //             this.storage.remove('offlinedata');
  //           })
  //         );
  //       } else {
  //         console.log('no local events to sync');
  //         return of(false);
  //       }
  //     })
  //   )
  // }

  
  storeRequest(url, type, data): Promise<any> {
    let req : StoredRequest = {
      url: url,
      type: type,
      data: data,
      time: new Date().getTime(),
      id: this.create_UUID()
    };
    return this.storage.get("offlinedata").then(items => {
      if (items) {
        items.push(req);
        this.storage.set("offlinedata", items);
      } else {
        this.storage.set("offlinedata", [req]);
      }

      this.settings.next(items);
      return req;
    });
  }

  // sendRequests(operations: StoredRequest[]) {
  //   let obs = [];
  //   // this.storage.remove('offlinedata');
  //   for (let op of operations) {
  //     console.log("Make one request: ", op);
  //     let oneObs = this.http
  //       .request<any>(op.type, op.url, {
  //         body: op.data,
  //         headers: new HttpHeaders({
  //           "Content-Type": "application/json"
  //         })
  //       })
  //       .pipe(
  //         tap(res => {
  //           // this.updatefarmer(res.data);
  //         }),
  //         catchError(err => {
  //           this.storage.get('offlinedata').then(storedOperations => {
  //             let storedObj = JSON.parse(storedOperations);

  //             if (storedObj) {
  //               storedObj.push(op);
  //             } else {
  //               storedObj = [op];
  //             }
  //             // Save old & new local transactions back to Storage
  //             return this.storage.set('offlinedata', JSON.stringify(storedObj));
  //           });
  //           throw new Error(err);
  //         })
  //       );
  //     obs.push(oneObs);
  //   }
  // }

  getItems(): Promise<any[]> {
    return this.storage.get("offlinedata");
  }

  getItem(objid): Promise<any> {
    return this.storage.get("offlinedata").then(items => {
      if (!items || items.length === 0) {
        return null;
      }

      return items.find(i => i.objid === objid);
    });
  }

  updateItem(item: any): Promise<any> {
    return this.storage.get("offlinedata").then(items => {
      if (!items || items.length === 0) {
        return null;
      }
      let newItems: any[] = [];

      for (let i of items) {
        console.log(i);
        if (i.objid == item.objid) {
          newItems.push(item);
        } else {
          newItems.push(i);
        }
      }
      console.log(newItems);
      this.settings.next(newItems);
      return this.storage.set("offlinedata", newItems);
    });
  }

  deleteItem(id: string): Promise<any> {
    return this.storage.get("offlinedata").then(items => {
      if (!items || items.length === 0) {
        return null;
      }

      let toKeep: any[] = [];

      for (let i of items) {
        if (i.objid !== id) {
          toKeep.push(i);
        }
      }
      this.settings.next(toKeep);
      return this.storage.set("offlinedata", toKeep);
    });
  }
  create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
  }
}
