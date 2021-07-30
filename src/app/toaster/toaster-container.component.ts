import {Component, OnInit} from '@angular/core';
import {Toast, ToasterService} from '../services/toaster.service';

@Component({
  selector: 'app-toaster-container',
  templateUrl: './toaster-container.component.html',
  styleUrls: ['./toaster-container.component.scss']
})
export class ToasterContainerComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    this.toasterService.getObservable().subscribe((toast) => {
      this.toasts = [toast, ...this.toasts];
      setTimeout(() => {
        this.remove(toast.id);
      }, toast.ttl);
    });
  }

  remove(id: number): void {
    this.toasts = this.toasts.filter((t) => t.id !== id);
  }
}
