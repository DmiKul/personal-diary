import { Injectable, Query } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { INote } from '@customTypes/models';
import { map, switchMap, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore, private fireStorage : AngularFireStorage) { }

  addNote(note : INote) {
    note.id = this.afs.createId();
    return this.afs.collection('/notes').add(note);
  }

  getNotesCount() {
    return this.afs.collection('/notes').get().pipe(
      map(snapshot => snapshot.size)
    );
  }

  getAllNotes() {
    // return this.afs.collection('/notes').snapshotChanges();
    return this.afs.collection('/notes', ref => ref.orderBy('body.time', 'desc')).snapshotChanges()
  }

  // getLimitedNotes(startTimeStamp: number | undefined, limit: number) {
  //   if (startTimeStamp) {
  //     return this.afs.collection('/notes', ref => ref.orderBy('body.time', 'desc').startAfter(startTimeStamp).limit(limit)).snapshotChanges()
  //   }
  //   return this.afs.collection('/notes', ref => ref.orderBy('body.time', 'desc').limit(limit)).snapshotChanges()
  // }

  getLimitedNotes(lastNoteId: string | undefined, limit: number) {
    let query = this.afs.collection('/notes', ref => ref.orderBy('body.time', 'desc'));

    if (lastNoteId) {
      // Получаем документ с переданным startTimeStamp
      return this.afs.doc(`/notes/${lastNoteId}`).get().pipe(
        take(1),
        switchMap((doc: any) => {
          // Приводим тип данных к ожидаемому типу QueryDocumentSnapshot<INote>
          const queryDoc = doc as QueryDocumentSnapshot<INote>;
          // Получаем документы, идущие после переданного документа
          // return query.ref.startAfter(queryDoc).limit(limit).get();
          return this.afs.collection('/notes', ref => ref.orderBy('body.time', 'desc').startAfter(queryDoc).limit(limit)).get();
        }),
        map(snapshot => {
          return snapshot.docs.map((doc: any) => {
            const data = doc.data();
            data.id = doc.id;
            return data;
          });
        })
      );
    }

    return this.afs.collection('/notes', ref => ref.orderBy('body.time', 'desc').limit(limit)).get().pipe(
      map(snapshot => {
        return snapshot.docs.map((doc: any) => {
          const data = doc.data();
          data.id = doc.id;
          return data;
        });
      })
    );
  }

  // getLimitedNotes(limit: number) {
  //   return this.afs.collection<INote>('/notes', ref => ref.limit(limit))
  //     .snapshotChanges()
  //     .pipe(
  //       map(actions => {
  //         return actions.map((a: DocumentChangeAction<INote>) => {
  //           const data = a.payload.doc.data();
  //           const id = a.payload.doc.id;
  //           return Object.assign({ id }, data); // Объединение объектов с новым свойством id
  //         });
  //       })
  //     );
  // }

  deleteNote(note : INote) {
     this.afs.doc('/notes/'+note.id).delete();
  }

  updateNote(id : string, newNote: INote) {
    console.log('update')
    return this.afs.doc('/notes/'+id).update(newNote)
  }
}
