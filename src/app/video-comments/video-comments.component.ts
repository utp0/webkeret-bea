import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../model/Comment';
import { CommentsService } from '../services/comments.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { UserIdToUsernamePipe } from '../user-id-to-username.pipe';
import { Observable } from 'rxjs';
import { UnixToHumandatetimePipe } from '../unix-to-humandatetime.pipe';

@Component({
  selector: 'app-video-comments',
  standalone: true,
  imports: [NgFor, AsyncPipe, CommentFormComponent, UserIdToUsernamePipe, NgIf, UnixToHumandatetimePipe],
  templateUrl: './video-comments.component.html',
  styleUrl: './video-comments.component.css'
})
export class VideoCommentsComponent implements OnInit {
  @Input("id") videoId!: string;
  comments$!: Observable<Comment[]>;
  errorMessage: string | null = null;

  constructor(private commentService: CommentsService) { }

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    if (this.videoId) {
      this.comments$ = this.commentService.getCommentsByVideoId(this.videoId);
    } else {
      this.errorMessage = "Videóazonosító hiányzik.";
    }
  }
}