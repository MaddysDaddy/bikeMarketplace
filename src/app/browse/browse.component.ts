import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { CookieService } from 'ngx-cookie';

import { Router } from '@angular/router';
import { Bike } from '../bike';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
})
export class BrowseComponent implements OnInit {

  loggedIn: boolean;

  bikes: Array<Bike> = [];

  filter: Bike = new Bike();

  currentUserID = this.cookieService.get('userID');

  constructor(
    private authService: AuthService,
    private router: Router,
    private dataService: DataService,
    private cookieService: CookieService
  ) { }

  logout() {
    this.authService.logout()
      .then(user => {
        console.log(user);
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  }

  deleteBike(id) {
    console.log('deleting bike...', id);
    this.dataService.deleteBike(id)
      .subscribe(deletedBike => {
        this.bikes.splice(this.bikes.indexOf(deletedBike), 1);
      });
  }

  getBikes() {
    this.dataService.getBikes()
      .subscribe(bikes => {
        this.bikes = bikes;
      });
  }

  ngOnInit() {
    this.loggedIn = this.authService.isAuthed();
    console.log(this.loggedIn);
    this.getBikes();
  }

}
