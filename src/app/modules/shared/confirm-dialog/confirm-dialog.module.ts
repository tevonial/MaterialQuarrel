import {ModuleWithProviders, NgModule} from '@angular/core';
import {ConfirmDialogComponent} from './confirm-dialog.component';
import {ConfirmDialogService} from './confirm-dialog.service';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [
    ConfirmDialogComponent
  ],
  exports: [
    ConfirmDialogComponent
  ]
})
export class ConfirmDialogModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: ConfirmDialogModule,
      providers: [ConfirmDialogService]
    };
  }
}
