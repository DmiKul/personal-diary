import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesPageComponent } from './pages/notes-page/notes-page.component';
import { CreateNotePageComponent } from './pages/create-note-page/create-note-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'create-note',
    component: CreateNotePageComponent,
    title: 'Создание записи',
  },
  { path: 'notes', component: NotesPageComponent, title: 'Записи' },
  { path: 'login', component: LoginPageComponent, title: 'Вход' },
  { path: 'register', component: RegisterPageComponent, title: 'Регистрация' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
