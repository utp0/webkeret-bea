import { Component, inject, Input } from '@angular/core';
import { OptionsService } from '../options.service';
import { RouterLink } from '@angular/router';
import { User } from '../model/User';

@Component({
  selector: 'app-menu-bar',
  imports: [RouterLink],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css'
})
export class MenuBarComponent {
  @Input("user") authedUser?: User = undefined;

  siteName: string;
  private options = inject(OptionsService);
  constructor() {
    this.siteName = this.options.siteName;
  }
}

