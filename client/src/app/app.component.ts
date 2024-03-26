import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { UserResponse } from './_models/user-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'client';

  constructor(private accountservice: AccountService) {}
  
  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const userResponse: UserResponse = JSON.parse(userString)
    this.accountservice.setCurrentUser(userResponse);
  }
 
}
