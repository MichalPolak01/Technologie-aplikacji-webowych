import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlogComponent } from "./components/blog/blog.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, BlogComponent]
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
