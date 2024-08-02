import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AdminService } from '../../../admin/services/user/admin/admin.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(
    private cookieService: CookieService,
    private router: Router
  ){}

  logout(){
    this.cookieService.delete('token');
    this.cookieService.delete('refreshToken');
    this.router.navigate(['/login']);
  }
}
