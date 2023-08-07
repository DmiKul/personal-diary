import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesPageComponent } from './notes-page.component';
import { ButtonModule } from 'primeng/button';
import { NoteComponent } from './components/note/note.component';
import { ImageModule } from 'primeng/image';
import { Routes } from '@angular/router';
import { InfiniteScrollComponent } from '@shared/components/infinite-scroll/infinite-scroll.component';
import { LoaderComponent } from '@shared/components/loader/loader.component';

const notesRoutes: Routes = [{ path: '', component: NoteComponent }]

@NgModule({
  declarations: [NotesPageComponent, NoteComponent, InfiniteScrollComponent, LoaderComponent],
  imports: [
    CommonModule,
    ButtonModule,
    ImageModule
  ],
  exports: [NotesPageComponent]
})
export class NotesPageModule {
}
