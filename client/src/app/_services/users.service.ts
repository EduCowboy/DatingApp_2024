import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserDetailResponse } from '../_models/user-detail-response';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<UserDetailResponse[]>(this.baseUrl + 'users')
  }

  getUser(userName: string) {
    return this.http.get<UserDetailResponse>(this.baseUrl + 'users/' + userName)
  }
}
