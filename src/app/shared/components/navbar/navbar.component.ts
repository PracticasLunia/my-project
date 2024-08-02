import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../admin/services/user/admin/admin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  admin: boolean = false;

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.adminService.isAdmin().subscribe(() => {
      this.admin = true;
    })
  }
}
