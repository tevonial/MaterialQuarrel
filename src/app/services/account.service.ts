import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService, JWTPayload} from './auth.service';

export interface User {
  username?: string;
  email?: string;
  role?: string;
  name?: {
    first: string;
    last: string;
  };
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

  updateAccount(update: User): Observable<boolean> {
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
        this.http.put(`${this.apiUrl}/${userId}/profile-image`, formData, { headers }).subscribe((response) => {
          subscriber.next(response as string);
          subscriber.complete();
        }, () => {
          subscriber.next(false);
          subscriber.complete();
        });
      });
    });
  }
}
