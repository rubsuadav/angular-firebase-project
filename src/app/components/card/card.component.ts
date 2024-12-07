import { Component, Input } from '@angular/core';

// local imports
import { Animal } from '../../models/animal';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() result: Animal[] = [];
  @Input() error: string = '';
}
