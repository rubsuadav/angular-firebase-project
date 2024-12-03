import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  protected token: string = '';

  constructor() {
    this.token = localStorage.getItem('access_token') || '';
  }

  protected logout() {
    localStorage.clear();
    window.location.reload();
  }
}
