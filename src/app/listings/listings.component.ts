import { Component, OnInit, Input } from '@angular/core';
import { Bike } from '../bike';
import { DataService } from '../services/data.service';
import { User } from '../user';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  //bikes: Array<Bike> = [];

  user: User;

  constructor(private dataService: DataService) { }

  getUserBikes() {
    console.log('Getting user bikes...');
    return this.dataService.getUserBikes()
      .subscribe(user => {
        // this.bikes = user.bikes;
        // console.log(this.bikes);
        this.user = user;
        console.log('Got this user: ', this.user);
      });
  }

  ngOnInit() {
    this.getUserBikes();
  }

}
