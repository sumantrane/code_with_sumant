import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './shared/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private loginService: LoginService, private _router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.loginService.isLoggedIn) {
      this._router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
