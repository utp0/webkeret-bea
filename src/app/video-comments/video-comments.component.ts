import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from '../comments.service';
import { Comment } from '../model/Comment';
import { NgFor, NgIf } from '@angular/common';
import { UnixToHumandatetimePipe } from '../unix-to-humandatetime.pipe';

@Component({
  selector: 'app-video-comments',
  imports: [NgIf, NgFor, UnixToHumandatetimePipe],
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
    // MF2 firebase-hez try-catch v vmi annak megfelelő kéne ide meg sok máshova is
    this.comments = this.commentService.getCommentsByVideoId(this.videoId);

  }

}
