import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { UserDetailResponse } from 'src/app/_models/user-detail-response';
import { UsersService } from 'src/app/_services/users.service';
import { GalleryModule, GalleryItem, ImageItem } from 'ng-gallery'

@Component({
  selector: 'app-member-detail',
  standalone: true,
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
  imports: [
    CommonModule,
    TabsModule,
    GalleryModule
  ]
})
export class MemberDetailComponent implements OnInit{
  userDetailResponse: UserDetailResponse | undefined;
  images: GalleryItem[] = []

  constructor(private userService: UsersService, private route: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    const userName = this.route.snapshot.paramMap.get('userName');

    if (!userName) return;

    this.userService.getUser(userName).subscribe({
      next: userDetailResponse => {
        this.userDetailResponse = userDetailResponse
        this.getImages()
      }
    })
  }

  getImages() {
    if(!this.userDetailResponse) return;

    for (const photo of this.userDetailResponse?.photos) {
      this.images.push(new ImageItem({ src: photo.url, thumb: photo.url}));
    }
  }

}
