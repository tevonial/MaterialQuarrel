import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MaterialImporter} from '../../material-importer';
import {CommonModule} from '@angular/common';
import {ThreadListComponent} from './thread-list/thread-list.component';
import {ThreadComponent} from './thread/thread.component';
import {FormsModule} from '@angular/forms';
import {ComposeDialogComponent, ComposeDialogEntryComponent} from './compose-dialog/compose-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import {TitleBarModule} from '../shared/title-bar/title-bar.module';

const routes: Routes = [
  {path: '', component: ThreadListComponent, children: [
      {path: 'compose', component: ComposeDialogEntryComponent}
    ]},
  {path: ':id', component: ThreadComponent}
];

@NgModule({
  declarations: [
    ThreadListComponent,
    ThreadComponent,
    ComposeDialogComponent,
    ComposeDialogEntryComponent,
    EditDialogComponent
  ],
  imports: [
    MaterialImporter,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    TitleBarModule
  ]
})
export class ThreadModule {}
