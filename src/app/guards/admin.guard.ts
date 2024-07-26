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
      this.adminService.isAdmin().subscribe(() => {}, (error) => {
        this.router.navigate(['/not-admin']);
        return false;
      });
      return true;
    } catch (err) {
      this.router.navigate(['/not-admin']);
      return false;
    }
  }
}
