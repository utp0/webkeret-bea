import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ClientDataService } from '../client-data.service';
import { Videos } from '../_testdata';
import { Video } from '../model/Video';
import { NgIf } from '@angular/common';
import { User } from '../model/User';

@Component({
  selector: 'app-video-share-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './video-share-form.component.html',
  styleUrl: './video-share-form.component.css'
})
export class VideoShareFormComponent {
  @Output() videoShared = new EventEmitter<void>();
  title: string = '';
  description: string = '';
  url: string = '';
  lengthInSeconds: number | null = null;
  currentUser: User | undefined = undefined;
  errorMessage: string = '';

  constructor(private clientData: ClientDataService) {
    this.currentUser = this.clientData.user;
  }

  shareVideo(): void {
    this.errorMessage = "";
    if (!this.currentUser) {
      this.errorMessage = "Videó megosztásához jelentkezz be.";
      return;
    }
    if (!this.title.trim() || !this.description.trim() || !this.url.trim() || this.lengthInSeconds === null || this.lengthInSeconds <= 0) {
      this.errorMessage = "Minden mező kitöltése kötelező, a hossznak pozitív számnak kell lennie.";
      return;
    }
    // xd
    try {
      new URL(this.url);
    } catch (_) {
      this.errorMessage = "Érvénytelen URL formátum.";
      return;
    }

    const newVideo: Video = {
      id: Date.now().toString(),
      title: this.title.trim(),
      originalUrl: this.url.trim(),
      length: this.lengthInSeconds,
      sharerId: this.currentUser.id,
      shareDescription: this.description.trim(),
      shareDate: Date.now()
    };

    Videos.unshift(newVideo);
    this.clearForm();
    this.videoShared.emit();
  }

  clearForm(): void {
    this.title = '';
    this.description = '';
    this.url = '';
    this.lengthInSeconds = null;
  }

  isFormValid(): boolean {
    return this.title.trim() !== "" && this.description.trim() !== "" && this.url.trim() !== "" && this.lengthInSeconds !== null && this.lengthInSeconds > 0;
  }
}