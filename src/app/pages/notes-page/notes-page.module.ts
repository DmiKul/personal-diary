import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesPageComponent } from './notes-page.component';
import { ButtonModule } from 'primeng/button';
import { NoteComponent } from './components/note/note.component';
import { ImageModule } from 'primeng/image';
import { Routes } from '@angular/router';
import { InfiniteScrollComponent } from '@shared/components/infinite-scroll/infinite-scroll.component';
import { LoaderModule } from '@shared/components/loader/loader.module';

@NgModule({
  declarations: [NotesPageComponent, NoteComponent, InfiniteScrollComponent],
  imports: [
    CommonModule,
    ButtonModule,
    ImageModule,
    LoaderModule
  ],
  exports: [NotesPageComponent]
})
export class NotesPageModule {
}
