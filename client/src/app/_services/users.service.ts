import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserDetailResponse } from '../_models/user-detail-response';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = environment.apiUrl;
  userDetailResponse: UserDetailResponse[] = [];

  constructor(private http: HttpClient) {}

  getUsers() {
    if(this.userDetailResponse.length > 0)
    {
      return of(this.userDetailResponse);
    }

    return this.http.get<UserDetailResponse[]>(this.baseUrl + 'users').pipe(
      map(userDetailResponse => {
        this.userDetailResponse = userDetailResponse;
        return userDetailResponse;
      })
    )
  }

  getUser(userName: string) {
    const user = this.userDetailResponse.find(x => x.userName === userName)

    if(user)
    {
      return of(user);
    }

    return this.http.get<UserDetailResponse>(this.baseUrl + 'users/' + userName)
  }

  updateUser(userDetails: UserDetailResponse) {
    return this.http.put(this.baseUrl + 'users', userDetails).pipe(
      map(() => {
        const index = this.userDetailResponse.indexOf(userDetails);
        this.userDetailResponse[index] = {...this.userDetailResponse[index], ...userDetails};
      })
    );
  }
}
