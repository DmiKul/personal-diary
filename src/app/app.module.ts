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
import { AngularFireModule } from '@angular/fire/compat';
import { AuthService } from '@shared/services/auth.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { NoteService } from '@shared/services/note.service';
import { DataService } from '@shared/services/data.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    LayoutModule,
    CreateNotePageModule,
    NotesPageModule,
    LoginPageModule,
    RegisterPageModule,
  ],
  providers: [AuthService, NoteService, DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
