import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  db!: IDBDatabase;
  usersStore!: IDBObjectStore

  constructor() {
    console.log('db-service log')
    const request = window.indexedDB.open('my-db', 1);

    request.onupgradeneeded = (event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
      this.createUsersStore();
      this.createNotesStore();
    };

    request.onsuccess = (event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
    };
  }

  private createUsersStore(): void {
    this.usersStore = this.db.createObjectStore('users', { keyPath: 'usersId', autoIncrement: true });
    console.log(this.usersStore)
    this.usersStore.createIndex('email_idx', 'email', {unique: true})
    // You can create indexes for additional queries here, if needed.
    // For example, you can create an index on the username for fast user lookup:
    // usersStore.createIndex('usernameIndex', 'username', { unique: true });
  }

  private createNotesStore(): void {
    const notesStore = this.db.createObjectStore('notes', { keyPath: 'notesId', autoIncrement: true });
    notesStore.deleteIndex('userIdIndex')
    // notesStore.createIndex('userIdIndex', 'userId', { unique: false });
  }

  add<T>(storeName: string, item: T): Observable<void> {
    return new Observable((observer) => {
      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(item);

      request.onsuccess = () => {
        observer.next();
        observer.complete();
      };

      request.onerror = (event) => {
        // observer.error(event.target.error);
        console.log('error')
      };
    });
  }

  delete<T>(storeName: string, id: number): Observable<void> {
    return new Observable((observer) => {
      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);

      request.onsuccess = () => {
        observer.next();
        observer.complete();
      };

      request.onerror = (event) => {
        // observer.error(event.target.error);
      };
    });
  }

  // Implement other CRUD operations like update, delete, getById, getAll, etc.
  // ...

  // getAllByIndex<T>(storeName: string, indexName: string, value: any): Observable<T[]> {
  //   return new Observable((observer) => {
  //     const transaction = this.db.transaction(storeName, 'readonly');
  //     const store = transaction.objectStore(storeName);
  //     const index = store.index(indexName);
  //     const request = index.getAll(value);

  //     request.onsuccess = () => {
  //       observer.next(request.result);
  //       observer.complete();
  //     };

  //     request.onerror = (event) => {
  //       // observer.error(event.target.error);
  //     };
  //   });
  // }
}
