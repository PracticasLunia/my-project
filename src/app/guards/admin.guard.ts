import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminService } from '../admin/services/user/admin/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private adminService: AdminService
  ) {}

  canActivate(): boolean {
    try {
      let value = true;
      this.adminService.isAdmin().subscribe(() => {
        value = true;
      }, (error) => {
        this.router.navigate(['/not-admin']);
        value = false;
      });
      return value;
    } catch (err) {
      this.router.navigate(['/not-admin']);
      return false;
    }
  }
}
