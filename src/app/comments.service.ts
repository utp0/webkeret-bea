import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comment } from './model/Comment';
import { Comments } from './_testdata';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor() { }

  getCommentsByVideoId(id: string): Comment[] {
    // teszt adatok
    const comments = Comments.filter(a => a.videoId === id);
    return comments;
  }
}
