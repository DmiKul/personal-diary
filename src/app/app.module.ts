import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { CreateNotePageModule } from './pages/create-note-page/create-note-page.module';
import { NotesPageModule } from './pages/notes-page/notes-page.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    CreateNotePageModule,
    NotesPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
