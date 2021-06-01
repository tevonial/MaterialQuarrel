import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountOverviewComponent} from './account-overview/account-overview.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {AccountSecurityComponent} from './account-security/account-security.component';
import {MaterialImporter} from '../../material-importer';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AccountComponent} from './account.component';
import {DirectivesModule} from '../directives/directives.module';

const routes: Routes = [
  {path: '', component: AccountComponent, children: [
      {path: 'overview', component: AccountOverviewComponent},
      {path: 'settings', component: AccountSettingsComponent},
      {path: 'security', component: AccountSecurityComponent},
      {path: '', redirectTo: 'overview', pathMatch: 'full'}
    ]},

  // {path: 'overview', component: AccountOverviewComponent},
  // {path: 'settings', component: AccountSettingsComponent},
  // {path: 'security', component: AccountSecurityComponent},
  // {path: '', redirectTo: 'overview', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AccountOverviewComponent,
    AccountSettingsComponent,
    AccountSecurityComponent
  ],
  imports: [
    MaterialImporter,
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    DirectivesModule
  ]
})
export class AccountModule {}
