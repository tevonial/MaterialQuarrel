import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageOptions, Post, PostQueryOptions, PostsResponse, ThreadService} from '../services/thread.service';
import {AuthService} from '../services/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  posts = [];

  private idSubscription: Subscription;
  private authorId: string;

  queryOptions: PostQueryOptions;
  pageOptions: PageOptions;
  totalPosts: number;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];


  constructor(
    private authService: AuthService,
    private threadService: ThreadService
  ) {}

  ngOnInit(): void {
    this.queryOptions = {
      sort: 'date'
    };

    this.pageOptions = {
      index: 0,
      pageSize: this.pageSize
    };

    this.idSubscription = this.authService.getId().subscribe((id) => {
      if (typeof id === 'string') {
        this.authorId = id;
        this.refreshPosts();
      }
    });
  }

  ngOnDestroy(): void {
    this.idSubscription.unsubscribe();
  }

  refreshPosts(): void {
    if (this.queryOptions.search == null || this.queryOptions.search === '') {
      delete this.queryOptions.search;
    }

    console.log(JSON.stringify(this.queryOptions));

    // type SortFunctionProvider = (a: Post, b: Post) => boolean;
    // type sortOptions = 'thread' | 'date';
    //
    // const sortFunctions: {[s in sortOptions]: SortFunctionProvider} = {
    //   thread: (a, b) => {
    //     if (typeof a.thread !== 'string' && typeof b.thread !== 'string') {
    //       return a.thread._id < b.thread._id;
    //     }
    //   },
    //   date: (a, b) => a.date < b.date
    // };

    this.threadService.getPostsByAuthor(this.authorId, this.queryOptions, this.pageOptions).subscribe((postsResponse: PostsResponse) => {
      // this.posts = posts.sort((a, b) => {
      //   for (const sortOption in sortFunctions) {
      //     if (sortFunctions.hasOwnProperty(sortOption)) {
      //       return sortFunctions[this.queryOptions.sort](a, b);
      //     }
      //   }
      // });

      ({posts: this.posts, totalPosts: this.totalPosts, pageSize: this.pageSize} = postsResponse);

      // this.posts = postsResponse.posts;
      // this.totalPosts = postsResponse.totalPosts;
      // this.pageSize = postsResponse.pageSize;
    });
  }

  onPageChange(postEvent): void {
    this.pageOptions.index = postEvent.pageIndex;
    this.pageOptions.pageSize = postEvent.pageSize;
    this.refreshPosts();
  }
}
