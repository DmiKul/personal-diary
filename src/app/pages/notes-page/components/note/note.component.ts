import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { INote } from '@customTypes/models';
import { AuthService } from '@shared/services/auth.service';
import { DataService } from '@shared/services/data.service';
import { NoteService } from '@shared/services/note.service';
import EditorJSHTML from 'editorjs-html';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.less'],
})
export class NoteComponent {
  userId!: string;
  @Input() note!: INote;
  @Output() deletedNote = new EventEmitter<string>();
  html!: any;

  constructor(
    private data: DataService,
    private router: Router,
    private noteService: NoteService,
    private auth: AuthService
  ) {}

  async ngOnInit() {
    this.userId = this.auth.getUserId();
    if (this.note) {
      const editorJSHTML = new EditorJSHTML();
      this.html = editorJSHTML.parse(this.note.body);
    }
  }

  deleteNote(): void {
    this.data.deleteNote(this.userId, this.note);
    this.deletedNote.emit(this.note.id);
  }

  editNote(): void {
    this.noteService.setNote(this.note);
    this.router.navigate(['create-note']);
  }
}
