import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs/Observable';
import { Bike } from '../bike';


@Injectable()
export class BikeResolve implements Resolve<Bike> {

  constructor(
    private dataService: DataService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Bike> {
    return this.dataService.getRandomBike();
  }
}
