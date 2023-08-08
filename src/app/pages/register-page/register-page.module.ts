import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPageComponent } from './register-page.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from '@shared/components/loader/loader.module';

@NgModule({
  declarations: [RegisterPageComponent],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    LoaderModule,
  ],
  exports: [RegisterPageComponent],
})
export class RegisterPageModule {}
