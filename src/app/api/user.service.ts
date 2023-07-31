import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { IndexedDBService } from './indexed-db.service';
import { IUser } from '../types/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly storeName = 'users';

  constructor(private indexedDBService: IndexedDBService) { }

  isEmailFree(email: string): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      // Открываем транзакцию чтения
      const transaction = this.indexedDBService.db.transaction('users', 'readonly');
      const usersStore = transaction.objectStore('users');

      // Запрашиваем пользователя с определенным email
      const emailIndex = usersStore.index('email_idx');
      const request = emailIndex.get(email);

      request.onsuccess = (event) => {
        const user = (event.target as IDBRequest).result;
        resolve(!user)
      };

      request.onerror = (event) => {
        // Обработка ошибок
        console.error('Ошибка при поиске пользователя:', (event.target as IDBRequest).error);
        reject()
      };
    })
 }

  addUser(user: IUser): void {
    let transaction = this.indexedDBService.db.transaction('users', 'readwrite')
    let users = transaction.objectStore('users')
    users.add(user)
  }

  // updateUser(user: IUser): Observable<void> {
  //   return this.indexedDBService.update(this.storeName, user);
  // }

  deleteUser(userId: number): Observable<void> {
    return this.indexedDBService.delete(this.storeName, userId);
  }

  // getUserById(userId: number): Observable<IUser | undefined> {
  //   return this.indexedDBService.getById(this.storeName, userId);
  // }

  getAllUsers(): Promise<IUser[]>{
    return new Promise((resolve, reject) => {
      let transaction = this.indexedDBService.db.transaction('users', 'readonly')
      let users = transaction.objectStore('users')
      let request = users.getAll()

      request.onsuccess = function() { // (4)
        resolve(request.result)
      };

      request.onerror = function() {
        reject(request.result)
      };
    })
  }
}
