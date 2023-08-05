import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { INote } from '@customTypes/models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore, private fireStorage : AngularFireStorage) { }

  addNote(note : INote) {
    note.id = this.afs.createId();
    return this.afs.collection('/notes').add(note);
  }

  getAllNotes() {
    return this.afs.collection('/notes').snapshotChanges();
  }

  deleteNote(note : INote) {
     this.afs.doc('/notes/'+note.id).delete();
  }

  updateNote(id : string, newNote: INote) {
    console.log('update')
    return this.afs.doc('/notes/'+id).update(newNote)
  }


}
