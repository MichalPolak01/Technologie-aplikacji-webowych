import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet,NavbarComponent]
})
export class AppComponent {
  public counter = 0;

  add() {
    this.counter++;
  }

  remove() {
    this.counter--;
  }
}
