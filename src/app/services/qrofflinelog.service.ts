import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class QrofflinelogService {
  constructor(private storage: Storage) {}
  settings = new BehaviorSubject<any[]>(null);

  addItem(item: any): Promise<any> {
    return this.storage.get("offlinelogs").then(items => {
      if (items) {
        items.push(item);
        this.storage.set("offlinelogs", items);
      } else {
        this.storage.set("offlinelogs", [item]);
      }
      this.settings.next(items);
      return item;
    });
  }

  getItems(): Promise<any[]> {
    return this.storage.get("offlinelogs");
  }

  getItem(item): Promise<any> {
    return this.storage.get("offlinelogs").then(items => {
      if (!items || items.length === 0) {
        return null;
      }

      return items.find(i => i.objid === item.objid);
    });
  }
  
  deleteItem(){
    this.storage.remove("offlinelogs");
  }
}
