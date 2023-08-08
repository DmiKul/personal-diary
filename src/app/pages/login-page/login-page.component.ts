import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less'],
})
export class LoginPageComponent {
  loginForm!: FormGroup;
  isLoginDataCorrect!: boolean;
  isFormSubmitted: boolean = false;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    // localStorage.removeItem('userId');

    //Делам выход пользователя, если он авторизован и перешел на этот url
    if (localStorage.getItem('userId')) {
      this.auth.logout()
    }
    //Подписываеся на Observable, чтобы следить за изменениями isLoading
    this.auth
      .getIsLoading()
      .subscribe((isLoading) => (this.isLoading = isLoading));
    //Создаем форму
    this._createForm();
    //Подписываеся на Observable, чтобы следить за изменениями isLoginDataCorrect
    this.auth
      .getIsLoginDataCorrect()
      .subscribe(
        (isLoginDataCorrect) => (this.isLoginDataCorrect = isLoginDataCorrect)
      );
  }

  private _createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    //Следим за изменениями значений формы
    this.loginForm.valueChanges.subscribe((v) => {
      this.isLoginDataCorrect = true; //убираем валидацию правильного логина и пароля при вводе значений
      this.isFormSubmitted = false;
    });
  }

  get _email() {
    return this.loginForm.get('email');
  }

  get _password() {
    return this.loginForm.get('password');
  }

  setIsLogingDataCorrect(value: boolean): void {
    this.isLoginDataCorrect = value;
  }

  register(): void {
    //Переходим на страницу регистрации
    this.router.navigate(['register']);
  }

  //Обрабатываем сабмит формы
  onSubmit() {
    this.isFormSubmitted = true;
    //Проверяем валидность
    if (this.loginForm.status == 'VALID') {
      const email: string = this._email?.value || '';
      const password: string = this._password?.value || '';
      //Осуществляем вход
      this.auth.login(email, password);
    }
  }
}
