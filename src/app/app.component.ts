import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from './services/auth.service';
import {MatMenuTrigger} from '@angular/material/menu';
import {SettingsService} from './services/settings.service';
import {AccountService} from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public auth: AuthService,
    public accountService: AccountService,
    public settings: SettingsService
  ) { }

  title = 'MaterialQuarrel';
  loading = false;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
// @HostBinding('class.dark-theme') darkTheme = false;

  credentials = {
    username: null,
    password: null
  };

  ngOnInit(): void {
    this.settings.reloadSettings();
  }

  logout(): void {
    this.auth.logout();
  }

  attemptLogin(): void {
    this.loading = true;

    this.auth.login(this.credentials).subscribe(() => {
      this.loading = false;
      this.trigger.closeMenu();
      this.credentials = {
        username: null,
        password: null
      };
    }, () => {
      console.log('error logging in');
      this.loading = false;
    });
  }
}
