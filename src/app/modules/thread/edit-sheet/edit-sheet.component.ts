import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-edit-sheet',
  templateUrl: './edit-sheet.component.html',
  styleUrls: ['./edit-sheet.component.scss']
})
export class EditSheetComponent {

  constructor(
    private matBottomSheetRef: MatBottomSheetRef<EditSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {post: string}
  ) { }

  submit(message: string): void {
    this.matBottomSheetRef.dismiss(message);
  }
}
