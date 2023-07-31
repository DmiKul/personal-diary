import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private router: Router, private userService: UserService) {}

  register(): void {
    this.router.navigate(['register'])
  }

  async onSubmit() {
    console.log(this.loginForm)
    //todo: валидация

    const email: string = this.loginForm.value.email || ''
    const password: string = this.loginForm.value.password || ''
    if (await this.userService.isLoginDataCorrect(email,  password)) {
      console.log('вход')
    } else {
       console.log('email или пароль введены неверно')
    }
  }
}
