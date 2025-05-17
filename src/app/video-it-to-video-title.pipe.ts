import { Pipe, PipeTransform } from '@angular/core';
import { VideosService } from './services/videos.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DocumentReference } from '@angular/fire/firestore';

@Pipe({
  name: 'videoIdToVideoTitle',
  standalone: true
})
export class VideoIdToVideoTitlePipe implements PipeTransform {

  constructor(private videosService: VideosService) { }

  transform(value: string | DocumentReference | undefined | null): Observable<string | undefined> {
    if (!value) {
      return of(undefined);
    }

    let videoIdToFetch: string;

    if (typeof value === 'string') {
      videoIdToFetch = value;
    } else if (value && typeof (value as DocumentReference).id === 'string') {
      videoIdToFetch = (value as DocumentReference).id;
    }
    else {
      console.warn('VideoIdToVideoTitlePipe received invalid input:', value);
      return of('Invalid Video Ref');
    }


    return this.videosService.getVideoById(videoIdToFetch).pipe(
      map(video => video ? video.title : 'Cím nem található')
    );
  }
}