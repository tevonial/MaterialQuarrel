import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import {MaterialImporter} from '../../material-importer';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {DirectivesModule} from '../shared/directives.module';
import {UserComponent} from './user/user.component';
import {TitleBarModule} from '../shared/title-bar/title-bar.module';

const routes: Routes = [
  {path: '', component: UserListComponent},
  {path: ':id', component: UserComponent}
];

@NgModule({
  declarations: [
    UserListComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    MaterialImporter,
    FormsModule,
    RouterModule.forChild(routes),
    DirectivesModule,
    TitleBarModule
  ]
})
export class UserModule { }
