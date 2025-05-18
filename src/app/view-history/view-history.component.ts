import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryService } from '../services/history.service';
import { ViewHistory } from '../model/History';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { switchMap, tap } from 'rxjs/operators'; //
import { VideoIdToVideoTitlePipe } from "../video-it-to-video-title.pipe";

@Component({
  selector: 'app-view-history',
  standalone: true,
  imports: [
    CommonModule,
    VideoIdToVideoTitlePipe,
    VideoIdToVideoTitlePipe
  ],
  templateUrl: './view-history.component.html',
  styleUrl: './view-history.component.css'
})
export class ViewHistoryComponent implements OnInit {
  viewHistory$!: Observable<ViewHistory[]>;
  errorMessage: string | null = null;

  constructor(
    private historyService: HistoryService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.viewHistory$ = this.authService.currentUser$.pipe(
      tap(user => {
        if (!user) {
          this.errorMessage = "Az előzmények megtekintéséhez jelentkezz be.";
        } else {
          this.errorMessage = null;
        }
      }),
      switchMap(user => {
        if (user && user.id) {
          return this.historyService.getHistoryByUserId(user.id);
        } else {
          return of([]);
        }
      })
    );
  }
}