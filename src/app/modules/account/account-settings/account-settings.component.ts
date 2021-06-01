import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from '../../../services/account.service';
import {Subscription} from 'rxjs';
import {AuthService, JWTPayload} from '../../../services/auth.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit, OnDestroy {

  accountUpdate = {
    username: null,
    email: null,
    role: null
  };

  nameUpdate = {
    name: {
      first: null,
      last: null
    }
  };

  reloadTimeStamp: string;

  token: JWTPayload;
  tokenSubscription: Subscription;
  loading = [false, false];
  loadingSaveName = false;

  constructor(
    private accountService: AccountService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.tokenSubscription = this.auth.getToken().subscribe((token) => {
      this.token = token;
      this.nameUpdate.name = this.token.name;
      this.accountUpdate = {
        username: this.token.username,
        email: this.token.email,
        role: this.token.role
      };
    });
  }

  ngOnDestroy(): void {
    this.tokenSubscription.unsubscribe();
  }

  saveAccountInfo(): void {
    this.loading[0] = true;

    this.accountService.updateAccount(this.accountUpdate).subscribe((status) => {
      this.loading[0] = false;
    });
  }

  saveBasicInfo(): void {
    this.loading[1] = true;

    this.accountService.updateAccount(this.nameUpdate).subscribe((status) => {
      this.loading[1] = false;
    });
  }

  /**
   * Use FileService to POST files to API
   * @param fileList FileList containing File data
   */
  onUploadProfileImageClicked(fileList: FileList): void {
    this.accountService.uploadProfileImage(fileList.item(0)).subscribe((profileImageId) => {
      if (profileImageId) {
        this.reloadTimeStamp = (new Date()).getTime().toString();
      }
    });
  }

  onSelectedFilesChanged($event: FileList): void {

  }
}
