import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {
  constructor(private storage: Storage) {}

  addItem(item: any): Promise<any> {
    return this.storage.get("personprofile").then(items => {
      if (items) {
        items.push(item);
        this.storage.set("personprofile", items);
      } else {
        this.storage.set("personprofile", [item]);
      }
      return item;
    });
  }

  getItems(): Promise<any[]> {
    return this.storage.get("personprofile");
  }

  getItem(objid): Promise<any> {
    return this.storage.get("personprofile").then(items => {
      if (!items || items.length === 0) {
        return null;
      }

      return items.find(i => i.objid === objid);
    });
  }

  updateItem(item: any): Promise<any> {
    return this.storage.get("personprofile").then(items => {
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
      return this.storage.set("personprofile", newItems);
    });
  }

  deleteItem(id: string): Promise<any> {
    return this.storage.get("personprofile").then(items => {
      if (!items || items.length === 0) {
        return null;
      }

      let toKeep: any[] = [];

      for (let i of items) {
        if (i.objid !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set("personprofile", toKeep);
    });
  }

}
