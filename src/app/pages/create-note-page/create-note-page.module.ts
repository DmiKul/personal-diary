import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNotePageComponent } from './create-note-page.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [CreateNotePageComponent],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule
  ],
  exports: [CreateNotePageComponent]
})
export class CreateNotePageModule { }
