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
  allNotesCount!: number;
  constructor(
    private router: Router,
    private auth: AuthService,
    private data: DataService,
    private noteService: NoteService
  ) {}

  ngOnInit(): void {
    if (this.auth)
      this.userId =
        this.auth.getUserId() || localStorage.getItem('userId') || '';
    if (!this.userId) {
      this.router.navigate(['login']);
    }
    this.isLoading = true;
    this.data.getNotesCount(this.userId).subscribe((res) => {
      this.allNotesCount = res;
      if (this.allNotesCount == 0) {
        this.isLoading = false;
      }
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
    if (!this.allNotesCount || this.notes.length == this.allNotesCount) {
      return;
    }
    this.isLoading = true;
    this.limit = Math.min(
      this.notesPerPage,
      this.allNotesCount - this.notes.length
    );
    this.data
      .getLimitedNotes(this.userId, this.lastNoteId, this.limit)
      .subscribe((res) => {
        const addElemsCount = this.allNotesCount - this.notes.length;
        res = res.slice(0, addElemsCount);
        this.notes = this.notes.concat(res);
        this.lastNoteId = this.notes[this.notes.length - 1].id;
        this.isLoading = false;
      });
  }

  deleteNote(id: string): void {
    this.notes = this.notes.filter((elem) => elem.id !== id);
    --this.allNotesCount;
  }
}
