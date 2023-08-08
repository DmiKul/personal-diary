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
    this._createForm();
    this.auth
      .getIsLoading()
      .subscribe((isLoading) => (this.isLoading = isLoading));
    this.auth.getIsEmailFree().subscribe((isEmailFree) => {
      this.isEmailFree = isEmailFree;
    });
  }

  private _createForm() {
    this.registerForm = this.fb.group(
      {
        email: [
          '',
          [Validators.required, Validators.email, emailDomainValidator()],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordConfirm: ['', [Validators.required]], //validator для совпадения паролей
      },
      {
        validators: [this.checkPasswords],
      }
    );
    this.registerForm.valueChanges.subscribe((v) => {
      this.isFormSubmitted = false;
      this.isEmailFree = true;
    });
  }

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('passwordConfirm')?.value;
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

  onSubmit() {
    this.isFormSubmitted = true;
    console.log(this.registerForm);
    const email: string = this._email?.value || '';
    const password: string = this._password?.value || '';
    if (this.registerForm.status == 'VALID') {
      this.auth.register(email, password);
    }
  }

  backToLogin(): void {
    this.router.navigate(['login']);
  }
}
