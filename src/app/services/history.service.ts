import { Injectable } from '@angular/core';
import { Video } from '../model/Video';
import { ViewHistory } from '../model/History';
import { History, Videos } from '../_testdata';

export interface HistoryEntry {
  timestamp: number,
  video: Video,
}

@Injectable({
  providedIn: 'root'
})

export class HistoryService {

  constructor() { }



  // cserélendő majd firebase-hez
  getHistoryForUser(userId: string): HistoryEntry[] {
    const history: ViewHistory[] = History.filter(a => a.userId === userId).sort((x, y) => y.timestamp - x.timestamp);

    const extraHistory: HistoryEntry[] = history.map(h => {
      const video = Videos.find(v => v.id === h.videoId);
      if (!video) {
        console.warn(`${h.videoId} videó id nem található.`);
        return null;
      }
      return {
        timestamp: h.timestamp,
        video: video
      };
    }).filter(entry => entry !== null) as HistoryEntry[];

    return extraHistory;
  }
}
