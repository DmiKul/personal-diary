import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { IUser } from '@customTypes/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginPageModule } from 'src/app/pages/login-page/login-page.module';
import { LoginPageComponent } from 'src/app/pages/login-page/login-page.component';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private isAuthorizedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userId: string = '';
  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isLoginDataCorrectSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private isEmailFree: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private data: DataService
  ) {
    if (localStorage.getItem('userId')) {
      this.setIsAuthorized(true)
    }
  }

  login(email: string, password: string): void {
    this.setIsLoading(true)
    this.fireAuth.signInWithEmailAndPassword(email, password).then(
      (userCredential) => {
        if (userCredential.user?.uid) {
          this.userId = userCredential.user.uid
          console.log('userId:', this.userId)
        } else {
          console.log('error with getting userId')
        }
        this.setIsLoading(false)
        this.setIsLoginDataCorrect(true)
        this.router.navigate(['notes']);
        this.setIsAuthorized(true);
        localStorage.setItem('userId', this.userId);
      },
      (err) => {
        this.setIsLoading(false)
        this.setIsLoginDataCorrect(false)
        // alert('Something went wrong');
        // this.router.navigate(['login'])
      }
    );
  }

  register(email: string, password: string) {
    this.setIsLoading(true)
    this.setIsEmailFree(true)
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        const user: IUser = {
          email: email,
          password: password,
          id: ''
        }
        this.data.addUser(user)
        alert('Registration Successful');
        this.setIsLoading(false)
        // this.sendEmailForVarification(res.user); //todo:  вернуться к этому позже
        this.router.navigate(['login']);
      },
      (err) => {
        this.setIsLoading(false)
        // alert(err.message);
        if (err.message == 'Firebase: The email address is already in use by another account. (auth/email-already-in-use).') {
          this.setIsEmailFree(false)
        }
        this.router.navigate(['register']);
      }
    );
  }

  // sign out
  logout() {
    this.fireAuth.signOut().then(
      () => {
        localStorage.removeItem('userId');
        this.router.navigate(['login']);
        this.userId = ''
        this.setIsAuthorized(false)
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  setIsEmailFree(value: boolean): void {
    this.isEmailFree.next(value)
  }

  getIsEmailFree(): Observable<boolean> {
    return this.isEmailFree.asObservable()
  }

  setIsLoginDataCorrect(value: boolean): void {
    this.isLoginDataCorrectSubject.next(value)
  }

  getIsLoginDataCorrect(): Observable<boolean> {
    return this.isLoginDataCorrectSubject.asObservable()
  }
  setIsAuthorized(value: boolean): void {
    this.isAuthorizedSubject.next(value);
  }

  getIsAuthorized(): Observable<boolean> {
    return this.isAuthorizedSubject.asObservable();
  }

  getUserId(): string {
    return this.userId
  }

  setIsLoading(value: boolean): void {
    this.isLoadingSubject.next(value)
  }

  getIsLoading(): Observable<boolean> {
    return this.isLoadingSubject.asObservable();
  }

  // sendEmailForVarification(user : any) { //todo: вернуться к этому позже
  //   console.log(user);
  //   user.sendEmailVerification().then((res : any) => {
  //     this.router.navigate(['varify-email']);
  //   }, (err : any) => {
  //     alert('Something went wrong. Not able to send mail to your email.')
  //   })
  // }
}
