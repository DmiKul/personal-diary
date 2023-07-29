import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPageComponent } from './register-page.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';



@NgModule({
  declarations: [RegisterPageComponent],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    PasswordModule
  ],
  exports: [RegisterPageComponent]
})
export class RegisterPageModule { }
