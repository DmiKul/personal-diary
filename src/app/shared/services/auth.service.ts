import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { IsAuthorizedService } from './is-authorized.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private router: Router, private isAuthorizedService: IsAuthorizedService) { }

  login(email: string, password: string): void {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true')
      this.router.navigate([''])
      this.isAuthorizedService.setIsAuthorized(true)
    }, err => {
      alert('Something went wrong')
      // this.router.navigate(['login'])
    })
  }

  register(email : string, password : string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then( res => {
      alert('Registration Successful');
      // this.sendEmailForVarification(res.user); //todo:  вернуться к этому позже
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  // sign out
  logout() {
    this.fireAuth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }

  // sendEmailForVarification(user : any) { //todo: вернуться к этому позже
  //   console.log(user);
  //   user.sendEmailVerification().then((res : any) => {
  //     this.router.navigate(['/varify-email']);
  //   }, (err : any) => {
  //     alert('Something went wrong. Not able to send mail to your email.')
  //   })
  // }
}
