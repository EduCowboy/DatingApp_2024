import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { UserRequest } from '../_models/user-request';
import { UserResponse } from '../_models/user-response';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userRequest: UserRequest = new UserRequest();
  userResponse: UserResponse = new UserResponse();
  //loggedIn = false;
  //currentUser$: Observable<UserResponse | null> = of(null)

  constructor(public accountService: AccountService) {}
  
  ngOnInit(): void {
    //this.getCurrentUser();
    //this.currentUser$ = this.accountService.currentUser$;
  }

  login() {
    this.accountService.login(this.userRequest).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => console.log(error)
    })
  }

  logout() {
    this.accountService.logout();
  }
}
