import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

//local imports
import { Animal } from '../../models/animal';
import { CRUDAnimalsService } from '../../services/crud-animals.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-animal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-animal.component.html',
  styleUrl: './create-animal.component.css',
})
export class CreateAnimalComponent {
  protected animal: Animal = {} as Animal;
  protected error: string = '';

  constructor(
    protected animalService: CRUDAnimalsService,
    protected router: Router
  ) {}

  protected createAnimal(animal: Animal) {
    this.animalService
      .createAnimal(animal)
      .then(() => {
        this.error = '';
        Swal.fire('Animal created successfully', '', 'success');
        this.router.navigate(['/animals']);
      })
      .catch((err: string) => {
        this.error = err;
      });
  }

  //this method clean all error when typing to form:
  protected cleanError() {
    this.error = '';
  }
}
