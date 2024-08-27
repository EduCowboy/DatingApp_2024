import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { UserDetailResponse } from 'src/app/_models/user-detail-response';
import { UserResponse } from 'src/app/_models/user-response';
import { AccountService } from 'src/app/_services/account.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any){
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }
  userDetailResponse: UserDetailResponse | undefined;
  userResponse: UserResponse | null = null;

  constructor(private accountService: AccountService, 
                private userService: UsersService,
                private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: userResponse => this.userResponse = userResponse
    })
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    if(!this.userResponse) return;
    this.userService.getUser(this.userResponse.userName).subscribe({
      next: userDetailResponse => this.userDetailResponse = userDetailResponse
    })
  }

  updateUser() {
    this.userService.updateUser(this.editForm?.value).subscribe({
      next: _ => {
        this.toastr.success('Profile updated!');
        this.editForm?.reset(this.userDetailResponse);
      }
    });
  }
}
