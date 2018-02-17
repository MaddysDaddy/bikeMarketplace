import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, status: RouterStateSnapshot): boolean {
    const isAuthed = this.authService.isAuthed();

    if (!isAuthed) {
      this.router.navigate(['/']);
    }
    return isAuthed;
  }
}
