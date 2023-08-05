import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { INote } from '@customTypes/models';
import { DataService } from '@shared/services/data.service';
import { NoteService } from '@shared/services/note.service';
import EditorJSHTML from 'editorjs-html';
// import TurndownService from 'turndown';
// import marked from 'marked';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.less'],
})
export class NoteComponent {
  @Input() note!: INote;
  html!: any;

  constructor(
    private data: DataService,
    private router: Router,
    // private noteBlocks: NoteBlocksServicem,
    private noteService: NoteService
  ) {}

  ngOnInit(): void {
    if (this.note) {
      const editorJSHTML = new EditorJSHTML();
      this.html = editorJSHTML.parse(this.note.body);
      console.log(this.html);
    }
  }

  deleteNote(): void {
    console.log('delete');
    this.data.deleteNote(this.note);
  }

  editNote(): void {
    console.log('edit');
    // this.noteBlocks.setNoteBlocks(this.note.body.blocks)
    this.noteService.setNote(this.note);
    this.router.navigate(['create-note']);
  }
}
