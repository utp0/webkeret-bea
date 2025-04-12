import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from '../comments.service';
import { Comment } from '../model/Comment';
import { NgFor, NgIf } from '@angular/common';
import { UnixToHumandatetimePipe } from '../unix-to-humandatetime.pipe';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { UserIdToUsernamePipe } from '../user-id-to-username.pipe';

@Component({
  selector: 'app-video-comments',
  imports: [NgIf, NgFor, UnixToHumandatetimePipe, CommentFormComponent, UserIdToUsernamePipe],
  templateUrl: './video-comments.component.html',
  styleUrl: './video-comments.component.css'
})
export class VideoCommentsComponent implements OnInit {
  videoId!: string | null;
  comments: Comment[] = [];
  errorMessage = '';

  constructor(private route: ActivatedRoute,
    private commentService: CommentsService
  ) { }

  ngOnInit(): void {
    this.videoId = this.route.snapshot.paramMap.get("id");
    this.loadComments();
  }

  loadComments(): void {
    if (!this.videoId) {
      this.errorMessage = 'Nincs megadva videó azonosító';
      return;
    }
    this.errorMessage = "";
    // MF2 firebase-hez try-catch v vmi annak megfelelő kéne ide meg sok máshova is
    this.comments = this.commentService.getCommentsByVideoId(this.videoId);
    this.comments.sort((a, b) => b.timestamp - a.timestamp);
  }

}
