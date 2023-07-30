import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-create-note-page',
  templateUrl: './create-note-page.component.html',
  styleUrls: ['./create-note-page.component.less']
})
export class CreateNotePageComponent {

  constructor(private router: Router) {}

  backToNotes() {
    this.router.navigate([''])
  }

}
