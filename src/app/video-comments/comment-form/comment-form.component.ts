import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ClientDataService } from '../../client-data.service';
import { Comments } from '../../_testdata'; // Import mutable array
import { Comment } from '../../model/Comment';
import { NgIf } from '@angular/common';
import { User } from '../../model/User';

@Component({
  selector: 'app-comment-form',
  imports: [FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css'
})
export class CommentFormComponent {

  @Input() videoId!: string;
  @Output() commentSubmitted = new EventEmitter<void>();
  commentText: string = "";
  currentUser: User | undefined = undefined;

  constructor(private clientData: ClientDataService) {
    this.currentUser = this.clientData.user;
  }

  submitComment(): void {
    if (!this.commentText.trim() || !this.currentUser || !this.videoId) return;

    const newComment: Comment = {
      id: Date.now().toString(), // jó ez most, majd mf2
      videoId: this.videoId,
      userId: this.currentUser.id,
      content: this.commentText.trim(),
      timestamp: Date.now()
    };
    Comments.push(newComment);
    this.commentText = "";
    this.commentSubmitted.emit();
  }

}
