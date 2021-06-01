import {Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-reply',
  templateUrl: './reply-sheet.component.html',
  styleUrls: ['./reply-sheet.component.css']
})
export class ReplySheetComponent {

  constructor(
    private matBottomSheetRef: MatBottomSheetRef<ReplySheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {replyToName: string}
  ) { }

  send(message: string): void {
    this.matBottomSheetRef.dismiss(message);
  }
}
