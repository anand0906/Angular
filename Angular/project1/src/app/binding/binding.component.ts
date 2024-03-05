import { Component } from '@angular/core';

@Component({
  selector: 'app-binding',
  standalone: true,
  imports: [],
  templateUrl: './binding.component.html',
  styleUrl: './binding.component.css',
})
export class BindingComponent {
  name: string = 'Anand';

  myfunc() {
    this.name = 'Pasam';
    return 'Calling Method';
  }

  myfunc2() {
    this.name = 'Pasam';
    alert('calling method');
    return 'Calling Method';
  }
}
