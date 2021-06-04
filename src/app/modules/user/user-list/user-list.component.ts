import { Component, OnInit } from '@angular/core';
import {AccountService, PageOptions, User, UserQuery, UsersResponse} from '../../../services/account.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userQuery: UserQuery;
  pageOptions: PageOptions;
  users: User[];
  columns: {name: string, display: string}[];
  displayedColumns: string[];
  totalUsers: number;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.userQuery = {
      search: '',
      searchBy: 'username'
    };

    this.pageOptions = {
      index: 0,
      pageSize: 10
    };

    this.columns = [
      {
        name: 'username',
        display: 'Username'
      }, {
        name: 'fullName',
        display: 'Name'
      }, {
        name: 'role',
        display: 'Role'
      }, {
        name: 'postCount',
        display: 'Posts'
      }, {
        name: 'threadCount',
        display: 'Threads'
      }
    ];

    this.displayedColumns = this.columns.map(c => c.name);

    this.refreshUsers();
  }

  refreshUsers(): void {
    this.accountService.getUsers(this.userQuery, this.pageOptions).subscribe((response: UsersResponse) => {
      this.totalUsers = response.totalUsers;
      this.pageSize = response.pageSize;
      this.users = response.users;
    });
  }

  onPageChange(event): void {
    this.pageOptions.index = event.pageIndex;
    this.pageOptions.pageSize = event.pageSize;
    this.refreshUsers();
  }
}
