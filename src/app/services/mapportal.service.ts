import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapportalService {

  constructor(  private http: HttpClient) { }

  getmaps(){
    return this.http.get(`http://192.168.50.2/maplist.json`);
  }
}
