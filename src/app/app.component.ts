import { Component, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuBarComponent } from "./menu-bar/menu-bar.component";
import { User } from './model/User';
import { ClientDataService } from './client-data.service';
import { Users } from './_testdata';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
    constructor(private clientData: ClientDataService) {
      this.clientData.user = Users[0];  // testing user
    }
}
