import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

export interface ThreadList {
  updated: Date;
  threads: [Thread];
}

export interface Thread {
  _id: string;
  author: string;
  title: string;
  created: Date;
  updated: Date;
  post: Post;
  length: number;
}

export interface Post {
  _id: string;
  date: Date;
  thread: string | {
    _id: string,
    title: string,
    created: Date,
    updated: Date,
    author: string,
    post: string
  };
  title: string;
  author: {
    name: {
      first: string;
      last: string;
    };
    fullName: string;
  };
  body: string;
  topLevel: boolean;
  parent?: string;
  children: [Post];
  image?: string;
}

export interface PostQueryOptions {
  search?: string;
  sort?: string;
}

export interface PageOptions {
  index: number;
  pageSize: number;
}

export interface PostsResponse {
  totalPosts: number;
  index: number;
  pageSize: number;
  posts: Post[];
}

const threadApiUrl = '/api/thread';
const postApiurl = '/api/post';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getThreads(): Observable<ThreadList> {
    return this.httpClient.get<ThreadList>(threadApiUrl);
  }

  getThreadById(id: string): Observable<Thread> {
    return this.httpClient.get<Thread>(`${threadApiUrl}/${id}`);
  }

  composeThread(title: string, body: string): Observable<Thread> {
    return this.httpClient.post<Thread>(threadApiUrl, {title, body});
  }

  getPostsByThread(id: string): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${postApiurl}/thread/${id}`);
  }

  getPostTree(threadId: string): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${postApiurl}/thread/${threadId}/tree`);
  }

  getPostsByAuthor(authorId: string, postQueryOptions: PostQueryOptions, pageOptions: PageOptions): Observable<PostsResponse> {
    const encodedPostQuery = encodeURIComponent(JSON.stringify(postQueryOptions));
    const encodedPageOptions = encodeURIComponent(JSON.stringify(pageOptions));

    return this.httpClient.get<PostsResponse>(`${postApiurl}/author/${authorId}?postQuery=${encodedPostQuery}&pageOptions=${encodedPageOptions}`);
  }

  replyToPost(postId: string, message: string): Observable<Post> {
    return this.httpClient.post<Post>(`${postApiurl}/${postId}/reply/`, {body: message});
  }

  editPost(postId: string, post: string): Observable<Post> {
    return this.httpClient.put<Post>(`${postApiurl}/${postId}`, {body: post});
  }

  deletePost(postId: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${postApiurl}/${postId}`);
  }
}
