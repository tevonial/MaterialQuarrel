import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {AccountService, User} from '../../../services/account.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  user: User = {
    _id: '',
    fullName: '',
    role: ''
  };

  constructor(
    public authService: AuthService,
    public accountService: AccountService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.accountService.getUser(params.get('id')).subscribe((user) => {
        this.user = user;
      });
    });
  }

}
