import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less'],
})
export class LoginPageComponent {
  loginForm!: FormGroup;
  isLoginDataCorrect: Boolean = true
  isFormSubmitted: Boolean = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this._createForm();
  }

  private _createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.loginForm.valueChanges.subscribe((v) => {
      this.isLoginDataCorrect = true
      this.isFormSubmitted = false
    })
  }

  get _email() {
    return this.loginForm.get('email')
  }

  get _password() {
    return this.loginForm.get('password')
  }

  register(): void {
    this.router.navigate(['register']);
  }

  async onSubmit() {
    this.isFormSubmitted = true
    console.log(this.loginForm);
    if (this.loginForm.status == 'VALID') {
      const email: string = this._email?.value || '';
      const password: string = this._password?.value || '';
      this.isLoginDataCorrect = await this.userService.isLoginDataCorrect(
        email,
        password
      );
      if (this.isLoginDataCorrect) {
        this.router.navigate(['']);
      }
    }
  }

  // isValid(): Boolean {
  //   this.isEmailFilled = !(
  //     this.loginForm.controls.email.errors !== null &&
  //     this.loginForm.controls.email.errors.hasOwnProperty('required')
  //   );
  //   this.isPasswordFilled = !(
  //     this.loginForm.controls.password.errors !== null &&
  //     this.loginForm.controls.password.errors.hasOwnProperty('required')
  //   );
  //   if (!this.isEmailFilled) {
  //     console.log('email is not filled');
  //   }
  //   if (!this.isPasswordFilled) {
  //     console.log('password is not filled');
  //   }
  //   return this.isEmailFilled && this.isPasswordFilled;
  // }

  // isLoginDataCorrect() {
  //   const email: string = this.loginForm.value.email || ''
  //   const password: string = this.loginForm.value.password || ''
  //   if (await this.userService.isLoginDataCorrect(email,  password)) {
  //     console.log('вход')
  //     return true
  //   } else {
  //      console.log('email или пароль введены неверно')
  //      return false
  //   }
  // }
}
