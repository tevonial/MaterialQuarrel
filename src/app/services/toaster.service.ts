import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id?: number;
  type: ToastType;
  subject: string;
  body: string;
  ttl: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  subject: Subject<Toast>;

  constructor() {
    this.subject = new Subject<Toast>();
  }

  getObservable(): Observable<Toast> {
    return this.subject.asObservable();
  }

  create(type: ToastType, subject: string, body: string, ttl: number | string): void {
    const id = (new Date().getTime()) + Math.floor((Math.random() * 100000) / 100000);

    if (typeof ttl === 'string') {
      ttl = Number(ttl);
    }

    this.subject.next({id, type, subject, body, ttl});
  }
}
