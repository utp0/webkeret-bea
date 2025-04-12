import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Videos } from '../_testdata';
import { VideoListitemComponent } from "../small-components/video-listitem/video-listitem.component";
import { VideoShareFormComponent } from '../video-share-form/video-share-form.component';

@Component({
  selector: 'app-homepage',
  imports: [RouterOutlet, VideoListitemComponent, NgFor, VideoShareFormComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  videos = Videos;

  ngOnInit(): void {
    this.refreshVideos();
  }

  refreshVideos(): void {
    this.videos = Videos.sort((a, b) => b.shareDate - a.shareDate);
  }
}
