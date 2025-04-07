import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../model/User';
import { HistoryEntry, HistoryService } from '../history.service';
import { ClientDataService } from '../client-data.service';
import { VideoListitemComponent } from '../small-components/video-listitem/video-listitem.component';

@Component({
  selector: 'app-view-history',
  imports: [
    CommonModule,
    VideoListitemComponent
  ],
  templateUrl: './view-history.component.html',
  styleUrl: './view-history.component.css'
})
export class ViewHistoryComponent {
  authedUser: User | undefined;
  userHistory: HistoryEntry[] = [];
  errorMessage = '';

  constructor(
    private clientData: ClientDataService,
    private historyService: HistoryService
  ) { }

  ngOnInit(): void {
    this.authedUser = this.clientData.user;
    if (!this.authedUser) {
      this.errorMessage = 'A megtekintési előzmények megtekintéséhez be kell jelentkezni.';
      return;
    }
    this.loadHistory();
  }

  loadHistory(): void {
    this.errorMessage = '';
    // hibakezelés MF2
    this.userHistory = this.historyService.getHistoryForUser(this.authedUser!.id);
  }
}
