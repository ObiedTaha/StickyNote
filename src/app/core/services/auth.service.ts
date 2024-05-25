import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment.developments';
import { Iuser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient) { }
  userToken:BehaviorSubject<any>=new BehaviorSubject(null);



  setUserToken(): void {
    let token = localStorage.getItem('token');
    if (token !== null) {
      this.userToken.next(token);
    }
  }



  signUp(userInfo: Iuser): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + `signUp`, userInfo);
  };

  signIn(userData: Iuser): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + `signIn`, userData);
  }


}
