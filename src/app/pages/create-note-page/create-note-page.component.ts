import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { INote } from '@customTypes/models';
import { DataService } from '@shared/services/data.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EditorComponent } from '@shared/components/editor/editor.component';
import { NoteService } from '@shared/services/note.service';
import { AuthService } from '@shared/services/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

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
  userId!: string;
  images: File[] = [];
  imageUrls: string[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private data: DataService,
    private sanitizer: DomSanitizer,
    private auth: AuthService,
    private noteService: NoteService,
    private storage: AngularFireStorage
  ) {
    this.userId = this.auth.getUserId() || localStorage.getItem('userId') || '';
    if (!this.userId) {
      this.router.navigate(['login']);
    }
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
    //todo: add validation in html
    if (this.addNoteForm.status == 'VALID') {
      const title: string = this._title?.value || '';

      this.editor
        .save()
        .then((outputData) => {
          this.getImageUrls().then(() => {
            const newNote: INote = {
              id: '',
              title: title,
              body: outputData,
              images: this.imageUrls,
            };
            if (this.editMode) {
              this.data.updateNote(this.userId, this.note.id, newNote);
            } else {
              this.data.addNote(this.userId, newNote);
            }
            // this._title?.setValue('')
            this.addNoteForm.reset();
            this.images.length = 0;
            this.note = {
              id: '',
              title: '',
              body: {
                time: 0,
                blocks: [],
              },
              images: this.imageUrls,
            };
            this.noteService.setNote(this.note);
            //todo: заметка изменена(создана) успешно
            this.router.navigate(['notes']);
          });
        })
        .catch((error) => {});
    }
  }

  async onFilesSelect(event: any) {
    for (const file of event.files) {
      this.images.push(file);
    }
  }

  async getImageUrls() {
    for (const img of this.images) {
      const imageUrl = await this.readFileAsDataURL(img);
      this.imageUrls.push(imageUrl);
    }
  }

  private readFileAsDataURL(file: any): Promise<string> {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject('Error reading file');
      };
      reader.readAsDataURL(file);
    });
  }

  backToNotes() {
    this.router.navigate(['notes']);
  }
}
