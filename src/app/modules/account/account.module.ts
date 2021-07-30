import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountOverviewComponent} from './account-overview/account-overview.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {AccountSecurityComponent} from './account-security/account-security.component';
import {MaterialImporter} from '../../material-importer';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AccountComponent} from './account.component';
import {TitleBarModule} from '../shared/title-bar/title-bar.module';
import {
  ChangePasswordDialogComponent,
  ChangePasswordDialogEntryComponent
} from './account-security/change-password-dialog/change-password-dialog.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {ImageUploadComponent} from './account-settings/profile-image-upload/image-upload.component';
import {MatSliderModule} from '@angular/material/slider';

const routes: Routes = [
  /**
   * Overview, Settings, and Security Tabs are children views of AccountComponent
   */
  {path: '', component: AccountComponent, children: [
      {path: 'overview', component: AccountOverviewComponent},
      {path: 'settings', component: AccountSettingsComponent},
      {path: 'security', component: AccountSecurityComponent, children: [
          {path: 'change-password', component: ChangePasswordDialogEntryComponent}
        ]},
      {path: '', redirectTo: 'overview', pathMatch: 'full'}
    ]},
];

@NgModule({
  declarations: [
    AccountComponent,
    AccountOverviewComponent,
    AccountSettingsComponent,
    AccountSecurityComponent,
    ChangePasswordDialogEntryComponent,
    ChangePasswordDialogComponent,
    ImageUploadComponent
  ],
  imports: [
    MaterialImporter,
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    TitleBarModule,
    ImageCropperModule
  ]
})
export class AccountModule {}
