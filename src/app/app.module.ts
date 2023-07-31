import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { CreateNotePageModule } from './pages/create-note-page/create-note-page.module';
import { NotesPageModule } from './pages/notes-page/notes-page.module';
import { LoginPageModule } from './pages/login-page/login-page.module';
import { RegisterPageModule } from './pages/register-page/register-page.module';
import { IndexedDBService } from './api/indexed-db.service';
import { UserService } from './api/user.service';
import { NoteService } from './api/note.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    CreateNotePageModule,
    NotesPageModule,
    LoginPageModule,
  ],
  providers: [IndexedDBService, UserService, NoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
