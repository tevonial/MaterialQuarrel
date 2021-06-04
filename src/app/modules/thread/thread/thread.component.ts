import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Post, Thread, ThreadService} from '../../../services/thread.service';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {ReplySheetComponent} from '../reply-sheet/reply-sheet.component';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {AuthService} from '../../../services/auth.service';
import {EditSheetComponent} from '../edit-sheet/edit-sheet.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EditDialogComponent} from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {

  thread: Thread;
  posts: Post[];

  replyBottomSheetRef: MatBottomSheetRef;
  editBottomSheetRef: MatBottomSheetRef;
  nestedTreeControl: NestedTreeControl<Post>;
  dataSource: MatTreeNestedDataSource<Post>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private threadService: ThreadService,
    private bottomSheet: MatBottomSheet,
    private matDialog: MatDialog,
    public auth: AuthService
  ) {
    this.nestedTreeControl = new NestedTreeControl<Post>(post => post.children);
    this.dataSource = new MatTreeNestedDataSource<Post>();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.threadService.getThreadById(params.get('id')).subscribe((thread) => {
        // console.log(`Thread: ${JSON.stringify(thread)}`);
        this.thread = thread;
        this.refreshPostTree();
      });
    });
  }

  refreshPostTree(): void {
    this.threadService.getPostTree(this.thread._id).subscribe((posts) => {
      // console.log(`Posts: ${JSON.stringify(posts)}`);

      this.posts = posts;
      this.dataSource.data = this.posts;
      this.nestedTreeControl.dataNodes = this.posts;
      this.nestedTreeControl.expandAll();
    });
  }

  hasNestedChild(_: string, node: Post): boolean {
    return node.children.length > 0;
  }

  replyTo(node: Post): void {
    // const nameOfAuthor = this.posts.filter((post) => {
    //   return post._id === postId;
    // })[0].author.fullName;


    // this.replyBottomSheetRef = this.bottomSheet.open(ReplySheetComponent, {
    //   data: { replyToName: node.author.fullName },
    //   panelClass: 'post-bottom-sheet'
    // });
    //
    // this.replyBottomSheetRef.afterDismissed().subscribe((message) => {
    //   if (typeof message !== 'string') {
    //     return;
    //   }
    //
    //   this.threadService.replyToPost(node._id, message).subscribe((post) => {
    //     this.refreshPostTree();
    //   });
    // });

    const dialogRef: MatDialogRef<EditDialogComponent> = this.matDialog.open(EditDialogComponent, {
      data: {
        post: '',
        prompt: `Reply to ${node.author.fullName}`
      },
      width: '50rem'
    });

    dialogRef.afterClosed().subscribe((edit) => {
      if (edit !== undefined && edit.submitted) {
        this.threadService.replyToPost(node._id, edit.body).subscribe((post) => {
          this.refreshPostTree();
        });
      }
    });
  }

  editPost(node: Post): void {
    // this.editBottomSheetRef = this.bottomSheet.open(EditSheetComponent, {
    //   data: { post: node.body},
    //   panelClass: 'post-bottom-sheet'
    // });
    //
    // this.editBottomSheetRef.afterDismissed().subscribe((editedPost) => {
    //   if (typeof editedPost !== 'string') {
    //     return;
    //   }
    //
    //   this.threadService.editPost(node._id, editedPost).subscribe((post) => {
    //     node.body = post.body;
    //   });
    // });

    const dialogRef: MatDialogRef<EditDialogComponent> = this.matDialog.open(EditDialogComponent, {
      data: {
        post: node.body,
        prompt: 'Edit Post'
      },
      width: '50rem'
    });

    dialogRef.afterClosed().subscribe((edit) => {
        if (edit !== undefined && edit.submitted) {
          this.threadService.editPost(node._id, edit.body).subscribe((post) => {
            node.body = post.body;
          });
        }
    });
  }

  deletePost(node: Post): void {
    this.threadService.deletePost(node._id).subscribe(() => {
      this.refreshPostTree();
    });
  }
}
