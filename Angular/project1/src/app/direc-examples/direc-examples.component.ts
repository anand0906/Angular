import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-direc-examples',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './direc-examples.component.html',
  styleUrl: './direc-examples.component.css',
})
export class DirecExamplesComponent {
  classes: any = { first: true };
  styles: any = { 'font-size': '50px' };
  visible: boolean = true;
  items: any = [1, 2, 3];

  trackByItems(index: number, item: any): number {
    console.log('Anand');
    return item;
  }
}
