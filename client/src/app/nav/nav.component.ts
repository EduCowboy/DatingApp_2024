import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { UserRequest } from '../_models/user-request';
import { UserResponse } from '../_models/user-response';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userRequest: UserRequest = new UserRequest();
  userResponse: UserResponse = new UserResponse();
  
  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) {}
  
  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.userRequest).subscribe({
      next: _ => this.router.navigateByUrl('/members'),
      error: error => this.toastr.error(error.error)
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }
}
