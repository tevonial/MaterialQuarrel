import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConfirmDialogComponent} from './confirm-dialog.component';
import {Observable} from 'rxjs';

@Injectable()
export class ConfirmDialogService {
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    private matDialog: MatDialog
  ) {
  }

  open(title: string, changes: string[]): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
        data: {
          confirmTitle: title,
          changes
        }
      });

      this.confirmDialogRef.afterClosed().subscribe((confirm) => {
        subscriber.next(confirm === 'true');
        subscriber.complete();
      });
    });
  }
}
