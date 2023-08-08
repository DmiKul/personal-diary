import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { INote } from '@customTypes/models';
import { AuthService } from '@shared/services/auth.service';
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
  userId!: string
  @Input() note!: INote;
  @Output() deletedNote = new EventEmitter<string>()
  html!: any;

  constructor(
    private data: DataService,
    private router: Router,
    // private noteBlocks: NoteBlocksServicem,
    private noteService: NoteService,
    private auth: AuthService
  ) {}

  async ngOnInit() {
    this.userId = this.auth.getUserId()
    if (this.note) {
      const editorJSHTML = new EditorJSHTML();
      this.html = editorJSHTML.parse(this.note.body);

      // this.getImageUrls()
    }
  }

  // async getImageUrls() {
  //   for (const img of this.note.images) {
  //     const imageUrl = await this.readFileAsDataURL(img);
  //     this.imageUrls.push(imageUrl);
  //   }
  // }

  // private readFileAsDataURL(file: any): Promise<string> {
  //   const reader = new FileReader();
  //   return new Promise((resolve, reject) => {
  //     reader.onload = () => {
  //       resolve(reader.result as string);
  //     };
  //     reader.onerror = () => {
  //       reject('Error reading file');
  //     };
  //     reader.readAsDataURL(file);
  //   });
  // }

  deleteNote(): void {
    console.log('delete', this.note);
    this.data.deleteNote(this.userId, this.note);
    this.deletedNote.emit(this.note.id)
  }

  editNote(): void {
    console.log('edit');
    // this.noteBlocks.setNoteBlocks(this.note.body.blocks)
    this.noteService.setNote(this.note);
    this.router.navigate(['create-note']);
  }
}
