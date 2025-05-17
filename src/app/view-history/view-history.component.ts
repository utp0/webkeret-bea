import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HistoryService } from '../services/history.service';
import { ViewHistory } from '../model/History';
import { UserIdToUsernamePipe } from '../user-id-to-username.pipe';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { switchMap, tap } from 'rxjs/operators'; //
import { VideoListitemComponent } from '../small-components/video-listitem/video-listitem.component';
import { VideoIdToVideoTitlePipe } from "../video-it-to-video-title.pipe";

@Component({
  selector: 'app-view-history',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    UserIdToUsernamePipe,
    VideoIdToVideoTitlePipe,
    VideoListitemComponent,
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