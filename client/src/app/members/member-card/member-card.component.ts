import { Component, Input, OnInit } from '@angular/core';
import { UserDetailResponse } from 'src/app/_models/user-detail-response';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit{
  @Input() userDetailResponse: UserDetailResponse | undefined;

  constructor() {}

  ngOnInit(): void {
    
  }

}
