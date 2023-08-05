import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { IsAuthorizedService } from 'src/app/shared/services/is-authorized.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less'],
})
export class LoginPageComponent {
  loginForm!: FormGroup;
  isLoginDataCorrect: boolean = true
  isFormSubmitted: boolean = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
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

  onSubmit() {
    this.isFormSubmitted = true
    console.log(this.loginForm);
    if (this.loginForm.status == 'VALID') {
      const email: string = this._email?.value || '';
      const password: string = this._password?.value || '';
      this.auth.login(email, password)
    }
  }
}
