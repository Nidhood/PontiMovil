import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HIndexComponent} from './home/h-index/h-index.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HIndexComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'frontend-angular';
}
