import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  logout(): void {
    this.auth.logout()
      .then(() => {
        this.router.navigateByUrl('/');
      })
      .catch(error => {
        console.log('Error occured logging out', error);
      });

  }

  ngOnInit() {
  }

}
