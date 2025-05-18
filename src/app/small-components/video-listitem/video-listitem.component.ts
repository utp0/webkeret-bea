import { Component, Input } from '@angular/core';
import { Video } from '../../model/Video';
import { SecsToHumantimePipe } from "../../secs-to-humantime.pipe";
import { UnixToHumandatetimePipe } from "../../unix-to-humandatetime.pipe";
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { UserIdToUsernamePipe } from '../../user-id-to-username.pipe';

@Component({
  selector: 'app-video-listitem',
  standalone: true,
  imports: [SecsToHumantimePipe, UnixToHumandatetimePipe, RouterLink, NgIf, UserIdToUsernamePipe, AsyncPipe],
  templateUrl: './video-listitem.component.html',
  styleUrl: './video-listitem.component.css'
})
export class VideoListitemComponent {
  @Input() video!: Video;
  @Input() viewTimestamp?: number;
}
