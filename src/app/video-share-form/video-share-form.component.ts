import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgIf } from '@angular/common';
import { VideosService } from '../services/videos.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-video-share-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule

  ],
  templateUrl: './video-share-form.component.html',
  styleUrl: './video-share-form.component.css'
})
export class VideoShareFormComponent implements OnInit {
  videoForm!: FormGroup;
  isSubmitting = false;
  errorMessage: string = '';

  @Output() videoShared = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private videosService: VideosService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.videoForm = this.fb.group({
      title: ['', Validators.required],
      originalUrl: ['', [Validators.required, Validators.pattern('^(http|https)://[^ "]+$')]],
      length: [null, [Validators.required, Validators.min(1)]],
      shareDescription: ['', Validators.required]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.videoForm.invalid) {
      this.errorMessage = "Kérjük, töltse ki az összes kötelező mezőt helyesen.";
      this.videoForm.markAllAsTouched();
      return;
    }
    this.errorMessage = '';

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser || !currentUser.id) {
      this.errorMessage = "Videó megosztásához jelentkezzen be.";
      this.isSubmitting = false;
      return;
    }
    const currentUserId = currentUser.id;

    this.isSubmitting = true;

    const videoData = {
      title: this.videoForm.value.title,
      originalUrl: this.videoForm.value.originalUrl,
      length: Number(this.videoForm.value.length),
      shareDescription: this.videoForm.value.shareDescription,
    };

    try {
      await this.videosService.createVideo(videoData, currentUserId);
      this.videoForm.reset();
      this.videoShared.emit();
    } catch (error) {
      console.error('Error sharing video:', error);
      this.errorMessage = "Hiba történt a videó megosztása közben. Próbálja újra később.";
    } finally {
      this.isSubmitting = false;
    }
  }
}