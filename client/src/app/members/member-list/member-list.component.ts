import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserDetailResponse } from 'src/app/_models/user-detail-response';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  userDetailResponse: UserDetailResponse[] = [];

  constructor(private userService: UsersService) {

  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers()
  {
    this.userService.getUsers().subscribe({
      next: usersDetailResponse => this.userDetailResponse = usersDetailResponse
    })
  }

}
