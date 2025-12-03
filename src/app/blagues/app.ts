import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JokeListComponent } from './components/joke-list/joke-list';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JokeListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Waste Time');
}
