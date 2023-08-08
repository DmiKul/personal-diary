import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { emailDomainValidator } from './validators/emailDomainValidator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.less'],
})
export class RegisterPageComponent {
  registerForm!: FormGroup;
  isFormSubmitted: boolean = false;
  isEmailFree: boolean = true;
  isLoading!: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    //Создаем форму
    this._createForm();
    //Следим за измененями isLoading
    this.auth
      .getIsLoading()
      .subscribe((isLoading) => (this.isLoading = isLoading));
    this.auth.getIsEmailFree().subscribe((isEmailFree) => {
      //Обновляем информацию, свободен ли введенный email
      this.isEmailFree = isEmailFree;
    });
  }

  private _createForm() {
    this.registerForm = this.fb.group(
      {
        email: [
          '',
          [Validators.required, Validators.email, emailDomainValidator()], //используем также кастомный валидатор
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordConfirm: ['', [Validators.required]],
      },
      {
        validators: [this.checkPasswords], //используем кастомный валидатор для проверки совпадения паролей
      }
    );
    //Следим за изменением значений формы
    this.registerForm.valueChanges.subscribe((v) => {
      this.isFormSubmitted = false;
      //При вводе данных перестаем отображать валидацию о занятом email
      this.isEmailFree = true;
    });
  }

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('passwordConfirm')?.value;
    //Если пароли не совпадают добавляем ошибку notSame
    return pass === confirmPass || confirmPass == '' ? null : { notSame: true };
  };

  get _email() {
    return this.registerForm.get('email');
  }

  get _password() {
    return this.registerForm.get('password');
  }

  get _passwordConfirm() {
    return this.registerForm.get('passwordConfirm');
  }

  //Обрабатываем сабмит формы
  onSubmit() {
    this.isFormSubmitted = true;
    const email: string = this._email?.value || '';
    const password: string = this._password?.value || '';
    if (this.registerForm.status == 'VALID') {
      //Если форма валидна, осуществляем регистрацию
      this.auth.register(email, password);
    }
  }

  backToLogin(): void {
    //Возвращаемся назад к странице входа
    this.router.navigate(['login']);
  }
}
