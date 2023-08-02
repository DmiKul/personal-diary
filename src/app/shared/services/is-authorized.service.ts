import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsAuthorizedService {

  private isAuthorizedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  setIsAuthorized(value: boolean): void {
    this.isAuthorizedSubject.next(value);
  }

  getIsAuthorized(): Observable<boolean> {
    return this.isAuthorizedSubject.asObservable();
  }
}
