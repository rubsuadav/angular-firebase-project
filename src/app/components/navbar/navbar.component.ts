import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// local imports
import { SearchService } from '../../services/search.service';
import { Animal } from '../../models/animal';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, FormsModule, CardComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  protected token: string = '';
  protected error: string = '';
  protected animal: Animal = {} as Animal;
  protected animals: Animal[] = [];

  constructor(protected searchService: SearchService) {
    this.token = localStorage.getItem('access_token') || '';
  }

  protected logout() {
    localStorage.clear();
    window.location.reload();
  }

  protected searchAnimals(name: string) {
    this.error = '';
    this.searchService
      .searchAnimalsByName(name)
      .then((animals) => {
        this.animals = animals;
      })
      .catch((err: string) => {
        this.error = err;
      });
  }
}
