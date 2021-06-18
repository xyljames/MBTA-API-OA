import { Component } from '@angular/core';
import { routingPagesNames } from './models/sharedData';
 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  routingPages = routingPagesNames;
}
