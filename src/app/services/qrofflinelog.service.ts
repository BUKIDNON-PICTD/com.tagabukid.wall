import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class QrofflinelogService {
  public _offlinelogs: Storage;
  constructor(private storage: Storage) {
    this._offlinelogs = new Storage({
      storeName: '_offlinelogs'
    }, {});
  }

  addItem(item: any): Promise<any> {

    return this._offlinelogs.get(item.objid).then( i => {
      if (!i) {
        this._offlinelogs.set(item.objid, item);
      }
      return item;
    });
  }

  getItems(): Promise<any[]> {
    return this._offlinelogs
      .keys()
      .then(keys =>
        Promise.all(keys.map(k => this._offlinelogs.get(k)))
      );
  }

  getItem(item): Promise<any> {
    return this._offlinelogs.get(item.objid).then(item => {
      if (!item) {
        return null;
      }
      return item;
    });
  }
  
  deleteItem(item): Promise<any> {
    return this._offlinelogs.remove(item.objid);
  }
}
