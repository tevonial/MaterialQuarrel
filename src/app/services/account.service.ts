import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService, JWTPayload} from './auth.service';

export interface User {
  _id: string;
  username?: string;
  email?: string;
  role?: string;
  name?: {
    first: string;
    last: string;
  };
  fullName?: string;
}

export interface UserQuery {
  search: string;
  searchBy: 'username' | 'name';
}

export interface PageOptions {
  index: number;
  pageSize: number;
}

export interface UsersResponse {
  totalUsers: number;
  index: number;
  pageSize: number;
  users: User[];
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  apiUrl = 'api/user';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  updateAccount(update: Partial<User>): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      this.auth.getId().subscribe((id) => {
        this.http.put<{token: string}>(`${this.apiUrl}/${id}`, update).subscribe((response) => {
          localStorage.setItem('currentUser', response.token);
          subscriber.next(true);
          subscriber.complete();
        }, (error) => {
          subscriber.next(false);
          subscriber.complete();
        });
      });
    });
  }

  getUsers(userQuery, pageOptions): Observable<UsersResponse> {
    const encodedUserQuery = encodeURIComponent(JSON.stringify(userQuery));
    const encodedPageOptions = encodeURIComponent((JSON.stringify(pageOptions)));

    return this.http.get<UsersResponse>(`${this.apiUrl}?userQuery=${encodedUserQuery}&pageOptions=${encodedPageOptions}`);
  }

  uploadProfileImage(file: File): Observable<string | boolean> {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return new Observable<string | boolean>((subscriber) => {
      this.auth.getId().subscribe((userId) => {
        this.http.put<string>(`${this.apiUrl}/${userId}/profile-image`, formData, { headers }).subscribe((response) => {
          subscriber.next(response);
          subscriber.complete();
        }, (error) => {
          console.log('Error: ' + JSON.stringify(error));
          subscriber.next(false);
          subscriber.complete();
        });
      });
    });
  }

  getProfileImageUrl(userId: string, thumb: boolean = false): string {
    const suffix = (thumb) ? '/thumb' : '';
    return `${this.apiUrl}/${userId}/profile-image${suffix}`;
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }
}
