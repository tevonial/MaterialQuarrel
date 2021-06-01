import { Component, OnInit } from '@angular/core';
import {AccountService, PageOptions, User, UserQuery} from '../../../services/account.service';

interface UserTile {
  name: string;
  role: string;
  avatar: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userQuery: UserQuery;
  pageOptions: PageOptions;
  users: User[];

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.userQuery = {
      search: '',
      searchBy: ''
    };

    this.pageOptions = {
      index: 0,
      pageSize: 10
    };

    this.refreshUsers();
  }

  refreshUsers(): void {
    this.accountService.getUsers(this.userQuery, this.pageOptions).subscribe((users) => {
      this.users = users;
    });
  }

}
