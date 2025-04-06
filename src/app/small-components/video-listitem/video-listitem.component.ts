import { Component, Input } from '@angular/core';
import { Video } from '../../model/Video';
import { SecsToHumantimePipe } from "../../secs-to-humantime.pipe";
import { UnixToHumandatetimePipe } from "../../unix-to-humandatetime.pipe";
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-video-listitem',
  imports: [SecsToHumantimePipe, UnixToHumandatetimePipe, RouterLink, NgIf],
  templateUrl: './video-listitem.component.html',
  styleUrl: './video-listitem.component.css'
})
export class VideoListitemComponent {
  @Input() video!: Video;
  @Input() viewTimestamp?: number;
}
