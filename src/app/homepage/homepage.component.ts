import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Videos } from '../_testdata';
import { VideoListitemComponent } from "../small-components/video-listitem/video-listitem.component";

@Component({
  selector: 'app-homepage',
  imports: [RouterOutlet, VideoListitemComponent, NgFor],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  videos = Videos;

}
