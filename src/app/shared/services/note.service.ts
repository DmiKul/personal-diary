import { Injectable } from '@angular/core';
import { INote } from '@customTypes/models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private noteSubject: BehaviorSubject<INote> = new BehaviorSubject<INote>({
    id: '',
    title: '',
    body: {
      time: 0,
      blocks: [],
    },
    images: []
  });

  constructor() {}

  setNote(value: INote): void {
    this.noteSubject.next(value);
  }

  getNote(): Observable<INote> {
    return this.noteSubject.asObservable();
  }
}
