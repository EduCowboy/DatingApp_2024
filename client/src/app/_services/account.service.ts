import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { UserRequest } from '../_models/user-request';
import { UserResponse } from '../_models/user-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUser = new BehaviorSubject<UserResponse | null>(null);
  currentUser$ = this.currentUser.asObservable();
  
  constructor(private http: HttpClient) { }

  login(userRequest: UserRequest)
  {
    return this.http.post<UserResponse>(this.baseUrl + 'account/login', userRequest).pipe(
      map((response: UserResponse) => {
        const userResponse = response;

        if(userResponse) {
          localStorage.setItem('userResponse', JSON.stringify(userResponse));
          this.currentUser.next(userResponse)
        }
      })
    );
  }

  register(userRequest: UserRequest){
    return this.http.post<UserResponse>(this.baseUrl + 'account/register', userRequest).pipe(
      map(userResponse => {
        if(userResponse){
          localStorage.setItem('userResponse', JSON.stringify(userResponse));
          this.currentUser.next(userResponse);
        }
      })
    )
  }

  setCurrentUser(user: UserResponse)
  {
    this.currentUser.next(user);
  }

  logout()
  {
    localStorage.removeItem('userResponse');
    this.currentUser.next(null);
  }
}
