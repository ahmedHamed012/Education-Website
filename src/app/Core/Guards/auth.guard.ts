import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthenticationService } from '../Services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthenticationService
  ) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    //   const tokenExist: string | null = window.localStorage.getItem('token');
    //   if (!tokenExist || tokenExist.trim() === '') {
    //     this.router.navigate(['/login']);
    //     return false;
    //   }
    //   try {
    //     const decodedToken = jwtDecode(tokenExist);
    //     const currentTime = Math.floor(Date.now() / 1000);
    //     if (decodedToken.exp && decodedToken.exp < currentTime) {
    //       this.router.navigate(['/login']); // Redirect to login if the token is invalid or expired
    //       return false;
    //     }
    //     return true;
    //   } catch (error) {
    //     console.error('Invalid token:', error);
    //     this.router.navigate(['/login']);
    //     return false;
    //   }
    // }
    // const tokenExist: string | null = window.localStorage.getItem('token');
    // if (!tokenExist || tokenExist.trim() === '') {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
    // return this.userService.getUserWithToken().pipe(
    //   map((value) => {
    //     if (value.status == 'success') return true;
    //     else {
    //       this.router.navigate(['/login']);
    //       return false;
    //     }
    //   })
    // );
    const tokenExist = window.localStorage.getItem('learn_on_token');
    if (!tokenExist || tokenExist == '') {
      this.authService.logout().subscribe({
        next: (result) => {
          localStorage.removeItem('learn_on_token');
          localStorage.removeItem('learn_on_device_token');
          this.router.navigate(['/auth/login']);
        },
      });
      return false;
    } else {
      return true;
    }
  }
}
