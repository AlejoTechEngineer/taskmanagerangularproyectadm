import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],  // SOLO RouterModule
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'task-manager';
}