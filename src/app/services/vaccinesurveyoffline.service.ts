import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class VaccinesurveyofflineService {
  public offlineSurvey: Storage;

  constructor(private storage: Storage) {
    this.offlineSurvey = new Storage({
      storeName: 'offlineSurvey'
    }, {});
  }

  addItem(item: any): Promise<any> {

    return this.offlineSurvey.get(item.objid).then( i => {
      if (!i) {
        this.offlineSurvey.set(item.objid, item);
      }
      return item;
    });
  }

  getItems(): Promise<any[]> {
    return this.offlineSurvey
      .keys()
      .then(keys =>
        Promise.all(keys.map(k => this.offlineSurvey.get(k)))
      );
  }

  getItem(item): Promise<any> {
    return this.offlineSurvey.get(item.objid).then(item => {
      if (!item) {
        return null;
      }
      return item;
    });
  }
  
  deleteItem(item): Promise<any> {
    return this.offlineSurvey.remove(item.objid);
  }
}
