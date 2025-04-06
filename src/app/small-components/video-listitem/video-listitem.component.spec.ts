import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoListitemComponent } from './video-listitem.component';

describe('VideoListitemComponent', () => {
  let component: VideoListitemComponent;
  let fixture: ComponentFixture<VideoListitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoListitemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoListitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
