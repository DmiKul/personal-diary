import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesPageComponent } from './notes-page.component';
import { ButtonModule } from 'primeng/button';
import { NoteComponent } from './components/note/note.component';
import { ImageModule } from 'primeng/image';

@NgModule({
  declarations: [NotesPageComponent, NoteComponent],
  imports: [
    CommonModule,
    ButtonModule,
    ImageModule
  ],
  exports: [NotesPageComponent]
})
export class NotesPageModule {
}
