import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { INote } from '@customTypes/models';
import { AuthService } from '@shared/services/auth.service';
import { DataService } from '@shared/services/data.service';
import { NoteService } from '@shared/services/note.service';

@Component({
  selector: 'app-notes-page',
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.less'],
})
export class NotesPageComponent {
  userId!: string;
  notes: INote[] = [];
  isLoading!: boolean;
  lastTimeStamp: number | undefined;
  lastNoteId: string | undefined;
  notesPerPage: number = 3;
  limit!: number;
  allNotesCount!: number; //количество всех существующих заметок пользователя
  constructor(
    private router: Router,
    private auth: AuthService,
    private data: DataService,
    private noteService: NoteService
  ) {}

  ngOnInit(): void {
    //Получаем id польлзователя
    if (this.auth)
      this.userId =
        this.auth.getUserId() || localStorage.getItem('userId') || '';
    //Если нет id пользователя, переходим на вход
    if (!this.userId) {
      this.router.navigate(['login']);
    }
    //Начинаем заргрузку
    this.isLoading = true;
    //Получаем количество заметок
    this.data.getNotesCount(this.userId).subscribe((res) => {
      this.allNotesCount = res;
      this.isLoading = false;
      //Получаем заметки
      this.getNotes();
    });
  }

  addNote(): void {
    this.noteService.setNote({
      id: '',
      title: '',
      body: {
        time: 0,
        blocks: [],
      },
      images: [],
    });
    this.router.navigate(['create-note']);
  }

  getNotes() {
    //Если их нет или они все уже получены или уже идет загрузка, не делаем запрос
    if (!this.allNotesCount || this.notes.length >= this.allNotesCount || this.isLoading) {
      return;
    }
    //Начинаем загрузку
    this.isLoading = true;
    //ВЫсчитываем, сколько заметок нужно в этой порции
    this.limit = Math.min(
      this.notesPerPage,
      this.allNotesCount - this.notes.length
    );
    console.log(this.limit)
    this.data
      .getLimitedNotes(this.userId, this.lastNoteId, this.limit)
      .subscribe((res) => {
        // const addElemsCount = this.allNotesCount - this.notes.length;
        // res = res.slice(0, addElemsCount);

        //Добавляем порцию заметок
        this.notes = this.notes.concat(res);
        console.log(this.notes)
        //Сохраняем id последней полученной заметки
        this.lastNoteId = this.notes[this.notes.length - 1].id;
        //Заканчиваем загрузку
        this.isLoading = false;
      });
  }

  deleteNote(id: string): void {
    //убираем удаленную заметку из массива
    this.notes = this.notes.filter((elem) => elem.id !== id);
    //Уменьшаем количество всех заметок
    --this.allNotesCount;
  }
}
