import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Bike } from '../bike';


import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  base = '/api/bikes';

  constructor(private http: Http) { }

  create(bike: Bike): Observable<Bike> {
    return this.http.post(this.base + '/create', bike)
      .map(response => response.json());
  }

  update(id, bike: Bike) {
    return this.http.put(`${this.base}/update/${id}`, bike)
      .map(response => response.json());
  }

  deleteBike(id) {
    return this.http.delete(`${this.base}/delete/${id}`)
      .map(response => response.json());
  }

  getBikes() {
    return this.http.get(this.base)
      .map(response => response.json());
  }

  getUserBikes() {
    return this.http.get(`${this.base}/listings`)
      .map(response => response.json());
  }

  getRandomBike() {
    return this.http.get(`${this.base}/random`)
      .map(response => response.json());
  }
}
