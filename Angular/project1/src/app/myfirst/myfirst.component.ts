import { Component, Input, SimpleChanges } from '@angular/core';
import { SecondComponent } from '../second/second.component';

@Component({
  selector: 'app-myfirst',
  standalone: true,
  imports: [SecondComponent],
  templateUrl: './myfirst.component.html',
  styleUrl: './myfirst.component.css',
})
export class MyfirstComponent {
  @Input() name: any;

  constructor() {
    console.log('Constructor Called !');
  }

  ngOnInit(): void {
    console.log('ngOnInit Called !');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Input Changed', changes);
  }

  ngDoCheck(): void {
    console.log('ngDoCheck Called ! ');
  }
}
