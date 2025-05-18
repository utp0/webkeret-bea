import { Component, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItemComponent } from './small-components/menu-item/menu-item.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  MatSidenav,
} from '@angular/material/sidenav';
import { routes } from './app.routes';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MenuBarComponent } from "./menu-bar/menu-bar.component";
import { AuthService } from './services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { User as FirebaseSDKUser } from 'firebase/auth';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenav,
    MatSidenavModule,
    MenuItemComponent,
    NgFor,
    MenuBarComponent,
    AsyncPipe,
    NgIf,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public routes = routes;
  public authService: AuthService = inject(AuthService);
  public firebaseUser$: Observable<FirebaseSDKUser | null>;

  showAuthForm = false;
  authAction: 'login' | 'register' | null = null;
  authEmail = '';
  authPassword = '';

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor() {
    this.firebaseUser$ = this.authService.firebaseUser$;
  }

  promptForLogin() {
    this.authAction = 'login';
    this.authEmail = '';
    this.authPassword = '';
    this.showAuthForm = true;
    this.sidenav.close();
  }

  promptForRegister() {
    this.authAction = 'register';
    this.authEmail = '';
    this.authPassword = '';
    this.showAuthForm = true;
    this.sidenav.close();
  }

  async submitAuthCredentials() {
    if (!this.authAction || !this.authEmail || !this.authPassword) {
      this.showAuthForm = false;
      return;
    }

    if (this.authAction === 'login') {
      await this.authService.login(this.authEmail, this.authPassword);
    } else if (this.authAction === 'register') {
      await this.authService.register(this.authEmail, this.authPassword);
    }
    this.showAuthForm = false;
    this.authAction = null;
  }

  cancelAuthForm() {
    this.showAuthForm = false;
    this.authAction = null;
  }

  handleLogout() {
    this.authService.logout().then(() => {
    });
  }
}