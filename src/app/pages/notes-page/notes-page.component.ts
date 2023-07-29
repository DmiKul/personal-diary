import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes-page',
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.less']
})
export class NotesPageComponent {
  constructor(private router: Router) {}

  addNote(): void {
    this.router.navigate(['/create-note'])
  }
}
