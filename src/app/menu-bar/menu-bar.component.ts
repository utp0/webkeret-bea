import { Component, inject, Input } from '@angular/core';
import { OptionsService } from '../services/options.service';
import { User } from '../model/User';
import { ClientDataService } from '../client-data.service';
import { MatSidenav } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css'
})
export class MenuBarComponent {
  authedUser?: User;
  siteName: string;

  @Input("sidenav") sidenav!: MatSidenav;

  toggleSidenav() {
    this.sidenav.toggle();
  }

  constructor(
    private options: OptionsService,
    private clientData: ClientDataService
  ) {
    this.siteName = this.options.siteName;
    this.authedUser = this.clientData.user;
  }
}
