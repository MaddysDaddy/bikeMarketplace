import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { Bike } from '../bike';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerUser: User = new User();
  registrationErrors: string[] = [];

  loginUser: User = new User();

  bikes: Array<Bike> = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private dataService: DataService
  ) { }

  register(e: Event, form: NgForm) {
    e.preventDefault();

    this.registerUser = form.value;
    console.log(this.registerUser);

    this.authService.register(this.registerUser)
      .then(registeredUser => {
        console.log('Registered user', registeredUser);
        this.router.navigate(['/browse']);
      })
      .catch(error => {
        console.log('error: ', error);
      });
  }

  login(e: Event, form: NgForm) {
    e.preventDefault();
    console.log('logging in...');

    this.loginUser = form.value;
    console.log(this.loginUser);

    this.authService.login(this.loginUser)
      .then(loggedUser => {
        console.log('Logged in as: ', loggedUser);
        this.router.navigate(['/browse']);
      })
      .catch(error => {
        console.log(error);
      });

  }

  getRandomBike() {
    this.dataService.getRandomBike()
      .subscribe(randBike => {
        this.bikes = randBike;
      });
  }

  ngOnInit() {
    this.getRandomBike();
    console.log(this.authService.isAuthed());
  }

}
