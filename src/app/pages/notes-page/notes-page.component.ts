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
  notes: INote[] = [];
  isLoading!: boolean;

  constructor(
    private router: Router,
    private auth: AuthService,
    private data: DataService,
    // private notesBlocks: NoteBlocksService,
    private noteService: NoteService
  ) {}

  ngOnInit(): void {
    this.getAllNotes();
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

  getAllNotes() {
    this.isLoading = true;
    this.data.getAllNotes().subscribe(
      (res) => {
        this.notes = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          console.log(data);
          return data;
        });
        this.isLoading = false;
        console.log(this.notes);
      },
      (err) => {
        this.isLoading = false;
        alert('Error while fetching notes');
      }
    );
  }
}
