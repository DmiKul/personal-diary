import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsAuthorizedService {

  private isAuthorizedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userIdSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  setIsAuthorized(value: boolean): void {
    this.isAuthorizedSubject.next(value);
  }

  getIsAuthorized(): Observable<boolean> {
    return this.isAuthorizedSubject.asObservable();
  }

  setUserId(value: string): void {
    this.userIdSubject.next(value)
  }

  getUserId(): Observable<string> {
    return this.userIdSubject.asObservable()
  }
}
