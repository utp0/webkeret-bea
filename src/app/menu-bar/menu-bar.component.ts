import { Component, inject, Input } from '@angular/core';
import { OptionsService } from '../options.service';
import { RouterLink } from '@angular/router';
import { User } from '../model/User';
import { ClientDataService } from '../client-data.service';

@Component({
  selector: 'app-menu-bar',
  imports: [RouterLink],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css'
})
export class MenuBarComponent {
  authedUser?: User;
  siteName: string;

  constructor(
    private options: OptionsService,
    private clientData: ClientDataService
  ) {
    this.siteName = this.options.siteName;
    this.authedUser = this.clientData.user;
  }
}
