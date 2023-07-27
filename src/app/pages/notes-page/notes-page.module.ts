import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesPageComponent } from './notes-page.component';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [NotesPageComponent],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [NotesPageComponent]
})
export class NotesPageModule { }
