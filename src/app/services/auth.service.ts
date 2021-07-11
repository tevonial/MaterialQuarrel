import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

export interface JWTPayload {
  _id: string;
  username: string;
  email: string;
  name: {
    first: string;
    last: string;
  };
  fullName: string;
  role: string;
  exp: number;
}

export interface PasswordChangeObject {
  currentPassword: string;
  newPassword: string;
}

const loginUrl = `/api/auth/login`;
const changePasswordUrl = (id) => `api/auth/${id}/password`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient
  ) {
    const userToken = localStorage.getItem('currentUser');
    if (userToken) {
      const payload: JWTPayload = JSON.parse(atob(userToken.split('.')[1]));
      this.loggedIn.next(payload.exp > Date.now() / 1000);
    }
  }

  public isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getToken(): Observable<JWTPayload> {
    return new Observable<JWTPayload>((subscriber) => {
      this.isLoggedIn().subscribe((loggedIn) => {
        if (loggedIn) {
          const userToken = localStorage.getItem('currentUser');
          const payload = JSON.parse(atob(userToken.split('.')[1]));
          subscriber.next(payload);
        }

        subscriber.complete();
      });
    });
  }

  getGreeting(): Observable<string> {
    return new Observable<string>((subscriber) => {
      this.getToken().subscribe((token) => {
        if (token.fullName !== null) {
          subscriber.next(token.fullName);
        }

        subscriber.complete();
      });
    });
  }

  getId(): Observable<string> {
    return new Observable<string>((subscriber) => {
      this.getToken().subscribe((token) => {
        subscriber.next(token._id);
        subscriber.complete();
      });
    });
  }

  login(credentials: {username: string, password: string}): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      this.http.post<any>(loginUrl, credentials).subscribe((response) => {
        localStorage.setItem('currentUser', response.token);
        this.loggedIn.next(true);
        subscriber.next(true);
        subscriber.complete();
      }, (err) => {
        subscriber.next(false);
        subscriber.complete();
      });
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
  }

  changePassword(passwordChangeObject: PasswordChangeObject): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      this.getId().subscribe((userId) => {
        this.http.put<{success: boolean}>(changePasswordUrl(userId), passwordChangeObject).subscribe((response) => {
          subscriber.next(response.success);
          subscriber.complete();
        });
      });
    });
  }

  test(): void {
    this.http.get('/api/account/test').subscribe((res) => {
      console.log(JSON.stringify(res));
    });
  }
}
