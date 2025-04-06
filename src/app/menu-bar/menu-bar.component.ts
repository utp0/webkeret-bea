import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { OptionsService } from '../options.service';
import { User } from '../model/User';
import { ClientDataService } from '../client-data.service';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-menu-bar',
  imports: [MatIcon, MatIconButton],
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
