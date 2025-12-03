import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { icons } from "src/app/icons"; 

@Component({
  selector: 'app-memory-layout',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, FontAwesomeModule],
  templateUrl: './memory-layout.component.html',
  styleUrls: ['./memory-layout.component.scss']
})
export class MemoryLayoutComponent {
  constructor(library: FaIconLibrary) {
    library.addIcons(...icons);
  }
}