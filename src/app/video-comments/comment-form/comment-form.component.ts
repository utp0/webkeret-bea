import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommentsService } from '../../services/comments.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css'
})
export class CommentFormComponent implements OnInit {
  @Input() videoId!: string;
  commentForm!: FormGroup;
  isSubmitting = false;
  @Output() commentSubmitted = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private commentsService: CommentsService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.commentForm.invalid || !this.videoId) {
      return;
    }

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser || !currentUser.id) {
      console.error('User not authenticated or ID missing');
      this.isSubmitting = false;
      return;
    }
    const currentUserId = currentUser.id;

    this.isSubmitting = true;
    const commentData = {
      content: this.commentForm.value.content
    };

    try {
      await this.commentsService.addComment(commentData, this.videoId, currentUserId);
      this.commentForm.reset();
      this.commentSubmitted.emit();
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      this.isSubmitting = false;
    }
  }
}