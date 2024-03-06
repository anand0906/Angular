import {
  Component,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyfirstComponent } from './myfirst/myfirst.component';
import { SecondComponent } from './second/second.component';
import { DirecExamplesComponent } from './direc-examples/direc-examples.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MyfirstComponent,
    SecondComponent,
    DirecExamplesComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'projct1';
}
