import { Component, OnInit } from '@angular/core';
import {ThreadService, ThreadList, Thread} from '../../../services/thread.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.scss']
})
export class ThreadListComponent implements OnInit {

  listUpdated: Date = null;
  threads: [Thread] = null;

  constructor(
    private threadService: ThreadService,
    public authService: AuthService
  ) { }

  refreshThreads(): void {
    this.threadService.getThreads().subscribe(threadList => {
      this.listUpdated = threadList.updated;
      this.threads = threadList.threads;
    });
  }

  ngOnInit(): void {
    this.refreshThreads();
  }
}
