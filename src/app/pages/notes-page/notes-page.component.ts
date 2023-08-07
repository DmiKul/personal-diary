import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { INote } from '@customTypes/models';
import { AuthService } from '@shared/services/auth.service';
import { DataService } from '@shared/services/data.service';
import { NoteService } from '@shared/services/note.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-notes-page',
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.less'],
})
export class NotesPageComponent {
  userId!: string
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
    // private notesBlocks: NoteBlocksService,
    private noteService: NoteService
  ) {}

  ngOnInit(): void {
    this.userId = this.auth.getUserId()
    this.isLoading = true;
    this.data.getNotesCount(this.userId).subscribe((res) => {
      this.allNotesCount = res;
      if (this.allNotesCount == 0) {
        this.isLoading = false;
      }
      console.log('allNotesCount:', this.allNotesCount);
      this.getNotes();
    });

    // this.getAllNotes()
  }

  addNote(): void {
    this.noteService.setNote({
      id: '',
      title: '',
      body: {
        time: 0,
        blocks: [],
      },
    });
    this.router.navigate(['/create-note']);
    // this.notesBlocks.setNoteBlocks([]);
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
    console.log(this.limit);
    this.data.getLimitedNotes(this.userId, this.lastNoteId, this.limit).subscribe((res) => {
      console.log(res);
      const addElemsCount = this.allNotesCount - this.notes.length
      res = res.slice(0, addElemsCount)
      this.notes = this.notes.concat(res);
      // this.lastTimeStamp = this.notes[this.notes.length - 1]?.body.time;
      this.lastNoteId = this.notes[this.notes.length - 1].id
      this.isLoading = false;
    });
    // this.data.getLimitedNotes(this.lastTimeStamp, this.limit).subscribe(
    //   (res) => {
    //     let newNotes: INote[] = res.map((e: any) => {
    //       const data = e.payload.doc.data();
    //       data.id = e.payload.doc.id;
    //       // console.log(data);
    //       return data;
    //     })
    //     // Обновляем переменную с загруженными элементами
    //     const addElemsCount = this.allNotesCount - this.notes.length
    //     newNotes = newNotes.slice(0, addElemsCount)
    //     this.notes = this.notes.concat(newNotes)
    //     this.lastTimeStamp = this.notes[this.notes.length - 1]?.body.time
    //     this.isLoading = false;
    //   },
    //   (err) => {
    //     this.isLoading = false;
    //     alert('Error while fetching notes');
    //   }
    // );
  }

  // getAllNotes() {
  //   this.isLoading = true;
  //   this.data.getAllNotes().subscribe(
  //     (res) => {
  //       this.notes = res.map((e: any) => {
  //         const data = e.payload.doc.data();
  //         data.id = e.payload.doc.id;
  //         console.log(data);
  //         return data;
  //       });
  //       this.isLoading = false;
  //       console.log(this.notes);
  //     },
  //     (err) => {
  //       this.isLoading = false;
  //       alert('Error while fetching notes');
  //     }
  //   );
  // }

  deleteNote(id: string): void {
    this.notes = this.notes.filter((elem) => elem.id !== id);
    --this.allNotesCount;
    console.log(this.notes);
  }
}
