import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNotePageComponent } from './create-note-page.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorComponent } from '@shared/components/editor/editor.component';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [CreateNotePageComponent, EditorComponent],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    FileUploadModule,
  ],
  exports: [CreateNotePageComponent],
})
export class CreateNotePageModule {}
