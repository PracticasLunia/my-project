import { Component, OnInit } from '@angular/core';
import { FindService } from '../../services/find.service';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  userList: User[] = []

  constructor(
    private findService: FindService
  ){ }

  ngOnInit(): void {
    this.findService.find('', '').subscribe((data) => {
      console.log(data)
      this.userList = data;
    })
  }
}
