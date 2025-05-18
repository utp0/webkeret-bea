import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { VideoListitemComponent } from "../small-components/video-listitem/video-listitem.component";
import { VideoShareFormComponent } from '../video-share-form/video-share-form.component';
import { Video } from '../model/Video';
import { VideosService } from '../services/videos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterOutlet, VideoListitemComponent, NgFor, VideoShareFormComponent, AsyncPipe],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  videos$!: Observable<Video[]>;

  constructor(private videosService: VideosService) {}

  ngOnInit(): void {
    this.refreshVideos();
  }

  refreshVideos(): void {
    this.videos$ = this.videosService.getAllVideos();
  }
}