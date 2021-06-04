import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {ThreadService} from '../../../services/thread.service';
import { Location } from '@angular/common';

// Compose Dialog
@Component({
  selector: 'app-compose-dialog',
  templateUrl: 'compose-dialog.component.html',
  styleUrls: ['compose-dialog.component.scss']
})
export class ComposeDialogComponent {
  thread = {
    title: '',
    body: ''
  };
}

// Compose Dialog Entry Component (for routing)
@Component({
  template: ''
})
export class ComposeDialogEntryComponent {
  constructor(
    public dialog: MatDialog,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private thread: ThreadService,
    private location: Location
  ) {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ComposeDialogComponent, {
      width: '50rem'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.title && result.body) {
        this.thread.composeThread(result.title, result.body).subscribe(() => {
          // After composing thread, navigate to thread-list
          this.router.navigate(['../'], { relativeTo: this.activatedRoute });
        });
      } else {
        // If compose cancelled, go back to previous route (which may be thread-list)
        this.location.back();
      }
    });
  }
}
