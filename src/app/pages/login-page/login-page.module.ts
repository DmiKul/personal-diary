import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';



@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    PasswordModule
  ],
  exports: [LoginPageComponent]
})
export class LoginPageModule { }
