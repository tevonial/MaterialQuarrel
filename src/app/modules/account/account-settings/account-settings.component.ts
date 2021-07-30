import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from '../../../services/account.service';
import {Subscription} from 'rxjs';
import {AuthService, JWTPayload} from '../../../services/auth.service';
import {base64ToFile} from 'ngx-image-cropper';
import {ToasterService} from '../../../services/toaster.service';

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

  croppedImage = '';

  constructor(
    private accountService: AccountService,
    public auth: AuthService,
    private toasterService: ToasterService
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

  imageChanged(base64: string): void {
    this.croppedImage = base64;
  }

  base64ImageToBlob(str): Blob {
    // extract content type and base64 payload from original string
    const pos = str.indexOf(';base64,');
    const type = str.substring(5, pos);
    const b64 = str.substr(pos + 8);

    // decode base64
    const imageContent = atob(b64);

    // create an ArrayBuffer and a view (as unsigned 8-bit)
    const buffer = new ArrayBuffer(imageContent.length);
    const view = new Uint8Array(buffer);

    // fill the view, using the decoded base64
    for (let n = 0; n < imageContent.length; n++) {
      view[n] = imageContent.charCodeAt(n);
    }

    // convert ArrayBuffer to Blob
    const blob = new Blob([buffer], { type });

    return blob;
  }

  uploadClicked(): void {
    // @ts-ignore
    // const file = new File([this.base64ImageToBlob(this.croppedImage)], 'image');
    this.accountService.uploadProfileImage(this.base64ImageToBlob(this.croppedImage)).subscribe(response => {
      console.log(response);
      if (response === false) {
        this.toasterService.create('error', 'Upload Error', 'Error occurred during profile image upload.', 5000);
      } else {
        this.toasterService.create('success', 'Profile Image Uploaded', 'Profile image successfully uploaded.', 5000);
      }
    });
  }
}
