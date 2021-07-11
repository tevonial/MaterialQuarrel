import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Location} from '@angular/common';
import {AuthService, PasswordChangeObject} from '../../../../services/auth.service';

@Component({
  templateUrl: 'change-password-dialog.html'
})
export class ChangePasswordDialogComponent {}

@Component({
  template: ''
})
export class ChangePasswordDialogEntryComponent {
  changePasswordObject: PasswordChangeObject;

  constructor(
    public dialog: MatDialog,
    public location: Location,
    private authService: AuthService
  ) {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '25rem'
    });

    dialogRef.afterClosed().subscribe((response: PasswordChangeObject) => {
      if (response === undefined) {
        this.location.back();
      }

      if (response.currentPassword && response.newPassword) {
        this.authService.changePassword(response).subscribe((result) => {
          console.log(`password change result: ${result}`);
          this.location.back();
        });
      }
    });
  }
}
