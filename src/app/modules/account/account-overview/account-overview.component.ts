import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.scss']
})
export class AccountOverviewComponent implements OnInit, OnDestroy {

  constructor(
    public auth: AuthService
  ) { }

  tokenInfo;
  tokenSubscription: Subscription;

  ngOnInit(): void {
    this.tokenSubscription = this.auth.getToken().subscribe((token) => {
      this.tokenInfo = [];

      for (const k in token) {
        if (token.hasOwnProperty(k)) {
          this.tokenInfo.push({key: k, value: token[k]});
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.tokenSubscription.unsubscribe();
  }

}
