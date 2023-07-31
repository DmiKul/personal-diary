import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/api/user.service';
import { IUser } from 'src/app/types/models';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.less']
})
export class RegisterPageComponent {
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    passwordConfirm: new FormControl(''),
  })

  constructor(private router: Router, private userService: UserService) {}

  backToLogin(): void {
    this.router.navigate(['login'])
  }

  onSubmit() {
    console.log(this.registerForm)
    //todo: валидация

    //проверка, свободен ли email
    const email: string = this.registerForm.value.email || ''
    const password: string = this.registerForm.value.password || ''
    const user: IUser = {
      email: email,
      password: password
    }
    this.userService.isEmailFree(email).then(isEmailFree => {
      if (isEmailFree) {
          this.userService.addUser(user)
      } else {
          console.log('пользователь с таким email уже зарегестрирован')
      }
    })

    // this.userService.getAllUsers().then(users => {
    //   console.log(users)
    // }).catch(error => {
    //   console.log("Error", error)
    // })




  }
}
