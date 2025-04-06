import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientDataService } from './client-data.service';
import { MenuItemComponent } from './small-components/menu-item/menu-item.component';
import { Users } from './_testdata';
import {
  MatSidenav, MatSidenavContainer, MatSidenavContent
} from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { routes } from './app.routes';
import { NgFor } from '@angular/common';
import { MenuBarComponent } from "./menu-bar/menu-bar.component";
import { BooleanInput } from '@angular/cdk/coercion';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    MatSidenav, MatSidenavContainer, MatSidenavContent, MenuItemComponent, NgFor, MenuBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public routes = routes;

  constructor(private clientData: ClientDataService) {
    this.clientData.user = Users[0];  // testing user, majd firebase lesz MF2-re
  }
}
