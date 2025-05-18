import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButton, MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [RouterLink,
    MatButtonModule, NgIf
  ],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css'
})
export class MenuItemComponent {
  @Input() routerTarget?: string;
  @Input() shouldEmit?: boolean = false;
  @Output() btnPressedEmitter: EventEmitter<void> = new EventEmitter<void>();

  btnPressed() {
    if (this.shouldEmit === true) {
      this.btnPressedEmitter.emit();
    }
  }
}