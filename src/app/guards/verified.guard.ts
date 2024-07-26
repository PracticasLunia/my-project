import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { VerifiedService } from '../shared/services/verified/verified.service';

@Injectable({
  providedIn: 'root'
})
export class VerifiedGuard implements CanActivate {

  constructor(
    private router: Router,
    private verifiedService: VerifiedService
  ) {}

  canActivate(): boolean {
    try {
      this.verifiedService.isVerified().subscribe(() => {}, (error) => {
        this.router.navigate(['/not-verified']);
        return false;
      });
      return true;
    } catch (err) {
      this.router.navigate(['/not-verified']);
      return false;
    }
  }
}
