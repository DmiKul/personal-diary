import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNotePageComponent } from './pages/create-note-page/create-note-page.component';

const routes: Routes = [
  { path: 'create-note', component: CreateNotePageComponent, title: 'Создание записи' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
