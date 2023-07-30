import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNotePageComponent } from './create-note-page.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { EditorComponent } from './components/editor/editor.component';


@NgModule({
  declarations: [CreateNotePageComponent, EditorComponent],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule
  ],
  exports: [CreateNotePageComponent]
})
export class CreateNotePageModule { }
