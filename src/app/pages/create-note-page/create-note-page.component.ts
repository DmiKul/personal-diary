import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { INote } from '@customTypes/models';
import { DataService } from '@shared/services/data.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EditorComponent } from '@shared/components/editor/editor.component';
import { NoteService } from '@shared/services/note.service';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-create-note-page',
  templateUrl: './create-note-page.component.html',
  styleUrls: ['./create-note-page.component.less'],
})
export class CreateNotePageComponent {
  @ViewChild(EditorComponent) editor!: EditorComponent;
  addNoteForm!: FormGroup;
  note!: INote;
  editMode!: boolean;
  userId!: string
  uploadedImage!: File

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private data: DataService,
    private sanitizer: DomSanitizer,
    private auth: AuthService,
    // private noteBlocks: NoteBlocksService,
    private noteService: NoteService
  ) {
    this.userId = this.auth.getUserId()
    this.noteService.getNote().subscribe((note) => {
      this.note = note;
      this.editMode = !!this.note.id;
      this._createForm();
    });
  }

  private _createForm() {
    this.addNoteForm = this.fb.group({
      title: [this.note.title || '', [Validators.required]],
    });
  }

  get _title() {
    return this.addNoteForm.get('title');
  }

  get _text() {
    return this.addNoteForm.get('text');
  }

  onSubmit() {
    // this.isFormSubmitted = true
    console.log(this.addNoteForm);
    //todo: add validation in html
    if (this.addNoteForm.status == 'VALID') {
      const title: string = this._title?.value || '';

      this.editor
        .save()
        .then((outputData) => {

          const newNote: INote = {
            id: '',
            title: title,
            body: outputData,
          };
          if (this.editMode) {
            this.data.updateNote(this.userId, this.note.id, newNote);
            // this.data.deleteNote(this.note)
            // this.data.addNote(newNote)
          } else {
            this.data.addNote(this.userId, newNote);
          }
          // this._title?.setValue('')
          this.addNoteForm.reset()
          this.note = {
            id: '',
            title: '',
            body: {
              time: 0,
              blocks: [],
            }
          }
          this.noteService.setNote(this.note)
          //todo: заметка изменена(создана) успешно
          this.router.navigate(['notes'])
        })
        .catch((error) => {
          console.log('Saving failed: ', error);
        });
    }
  }

  onUpload(event: any) {
    console.log('upload')
    this.uploadedImage = event.files[0]
    console.log(this.uploadedImage)
  }

  backToNotes() {
    this.router.navigate(['notes']);
  }
}
