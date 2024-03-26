import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { UserRequest } from '../_models/user-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //Parent to Child implementation
  //@Input() usersFromHomeComponent: any;
  @Output() cancelRegister = new EventEmitter();
  userRequest: UserRequest = new UserRequest();

  constructor(private accountService: AccountService) {  }

  ngOnInit(): void {
  }

  register() {
    this.accountService.register(this.userRequest).subscribe({
      next: response => {
        this.cancel();
      },
      error: error => console.log(error)
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
