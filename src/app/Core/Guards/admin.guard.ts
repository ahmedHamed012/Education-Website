import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AuthenticationService } from '../Services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AdminRoutesGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthenticationService
  ) {}
  canActivate(): Observable<boolean> {
    const tokenExist = localStorage.getItem('learn_on_token'); // Corrected key

    if (!tokenExist || tokenExist === '') {
      this.router.navigate(['/auth/login']);
      return of(false);
    }

    return this.authService.getLoggedInAdminData(tokenExist).pipe(
      map((result) => result.user['role'] === 'admin'),
      tap((isAdmin) => {
        if (!isAdmin) {
          this.authService.logout().subscribe({
            next: (result) => {
              localStorage.removeItem('learn_on_token');
              localStorage.removeItem('learn_on_device_token');
              this.router.navigate(['/auth/login']);
            },
          });
        }
      }),
      catchError((error) => {
        console.error(error);
        this.authService.logout().subscribe({
          next: (result) => {
            localStorage.removeItem('learn_on_token');
            localStorage.removeItem('learn_on_device_token');
            this.router.navigate(['/auth/login']);
          },
        });
        return of(false);
      })
    );
  }
}
