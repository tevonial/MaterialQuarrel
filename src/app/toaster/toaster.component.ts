import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ToasterService} from '../services/toaster.service';
import {Toast} from '../services/toaster.service';

@Component({
  selector: 'app-toaster',
  templateUrl: 'toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent {
  @Input() i: number;
  @Input() toast: Toast;

  @Output() closeButton: EventEmitter<number> = new EventEmitter<number>();

  onCloseButton(): void {
    this.closeButton.emit(this.toast.id);
  }
}
