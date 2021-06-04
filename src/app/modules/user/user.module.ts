import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import {MaterialImporter} from '../../material-importer';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {DirectivesModule} from '../shared/directives.module';

const routes: Routes = [
  {path: '', component: UserListComponent}
];

@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    MaterialImporter,
    FormsModule,
    RouterModule.forChild(routes),
    DirectivesModule
  ]
})
export class UserModule { }
