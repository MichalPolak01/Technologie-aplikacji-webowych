import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlogComponent } from "./components/blog/blog.component";
import { BlogHomeComponent } from './components/blog-home/blog-home.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, BlogHomeComponent]
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
