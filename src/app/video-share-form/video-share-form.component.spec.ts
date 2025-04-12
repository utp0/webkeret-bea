import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoShareFormComponent } from './video-share-form.component';

describe('VideoShareFormComponent', () => {
  let component: VideoShareFormComponent;
  let fixture: ComponentFixture<VideoShareFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoShareFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoShareFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
