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
      //Создаем форму
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

  //Обрабатываем сабмит формы
  onSubmit() {
    //todo: add validation in html
    if (this.addNoteForm.status == 'VALID') {
      const title: string = this._title?.value || '';
      //Сохраняем данные из editorjs
      this.editor
        .save()
        .then((outputData) => {
          //Преобразуем файлы картинок в url
          this.getImageUrls().then(() => {
            const newNote: INote = {
              id: '',
              title: title,
              body: outputData,
              images: this.imageUrls,
            };
            //Проверяем какой режим - редактирования или создания заметки
            if (this.editMode) {
              //Обновляем заметку
              this.data.updateNote(this.userId, this.note.id, newNote);
            } else {
              //Добавляем новую
              this.data.addNote(this.userId, newNote);
            }
            //Делаем сброс значений формы
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
            //Задаем дефолтные значения, чтобы показать, что теперь никакая заметка не редактируется
            this.noteService.setNote(this.note);
            //todo: заметка изменена(создана) успешно
            //Переходим на страницу заметок
            this.router.navigate(['notes']);
          });
        })
        .catch((error) => {});
    }
  }

  //Обрабатываем событие выбора файла
  async onFilesSelect(event: any) {
    for (const file of event.files) {
      this.images.push(file);
    }
  }

  async getImageUrls() {
    for (const img of this.images) {
      const imageUrl = await this.readFileAsDataURL(img);
      //Сохраняем полученные url
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
    //Возвращаемся назад на страницу заметок
    this.router.navigate(['notes']);
  }
}
