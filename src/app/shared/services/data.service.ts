import { Injectable, Query } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { INote, IUser } from '@customTypes/models';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private afs: AngularFirestore,
  ) {}

  addNote(userId: string, note: INote) {
    note.id = this.afs.createId();
    return this.afs.collection(`/users/${userId}/notes`).add(note);
  }

  addUser(user: IUser) {
    user.id = this.afs.createId();
    return this.afs.collection('/users').add(user);
  }

  getNotesCount(userId: string) {
    return this.afs
      .collection(`/users/${userId}/notes`)
      .get()
      .pipe(map((snapshot) => snapshot.size));
  }

  getAllNotes(userId: string) {
    return this.afs
      .collection(`/users/${userId}/notes`, (ref) =>
        ref.orderBy('body.time', 'desc')
      )
      .snapshotChanges();
  }

  getLimitedNotes(
    userId: string,
    lastNoteId: string | undefined,
    limit: number
  ) {
    if (lastNoteId) {
      // Получаем документ с переданным startTimeStamp
      return this.afs
        .doc(`/users/${userId}/notes/${lastNoteId}`)
        .get()
        .pipe(
          take(1),
          switchMap((doc: any) => {
            // Приводим тип данных к ожидаемому типу QueryDocumentSnapshot<INote>
            const queryDoc = doc as QueryDocumentSnapshot<INote>;
            // Получаем документы, идущие после переданного документа
            return this.afs
              .collection(`/users/${userId}/notes`, (ref) =>
                ref
                  .orderBy('body.time', 'desc')
                  .startAfter(queryDoc)
                  .limit(limit)
              )
              .get();
          }),
          map((snapshot) => {
            return snapshot.docs.map((doc: any) => {
              const data = doc.data();
              data.id = doc.id;
              return data;
            });
          })
        );
    }

    return this.afs
      .collection(`/users/${userId}/notes`, (ref) =>
        ref.orderBy('body.time', 'desc').limit(limit)
      )
      .get()
      .pipe(
        map((snapshot) => {
          return snapshot.docs.map((doc: any) => {
            const data = doc.data();
            data.id = doc.id;
            return data;
          });
        })
      );
  }

  deleteNote(userId: string, note: INote) {
    if (userId) {
      this.afs.doc(`/users/${userId}/notes/${note.id}`).delete();
    }
  }

  updateNote(userId: string, noteId: string, newNote: INote) {
    console.log('update');
    return this.afs.doc(`/users/${userId}/notes/${noteId}`).update(newNote);
  }
}
