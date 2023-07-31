import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IndexedDBService } from './indexed-db.service';
import { INote } from '../types/models';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private readonly storeName = 'notes';

  constructor(private indexedDBService: IndexedDBService) { }

  addNote(note: INote): Observable<void> {
    return this.indexedDBService.add(this.storeName, note);
  }

  // updateNote(note: INote): Observable<void> {
  //   return this.indexedDBService.update(this.storeName, note);
  // }

  deleteNote(noteId: number): Observable<void> {
    return this.indexedDBService.delete(this.storeName, noteId);
  }

  // getNoteById(noteId: number): Observable<INote | undefined> {
  //   return this.indexedDBService.getById(this.storeName, noteId);
  // }

  // getAllNotesByUserId(userId: number): Observable<INote[]> {
  //   return this.indexedDBService.getAllByIndex(this.storeName, 'userId', userId);
  // }
}
