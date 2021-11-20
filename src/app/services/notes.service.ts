import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class NotesService {

  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;
  private token: string;
  constructor(private httpClient: HttpClient,private auth:AuthenticationService){
      this.token = this.auth.getBearerToken();
      this.notesSubject = new BehaviorSubject(this.notes);
  }

  fetchNotesFromServer() {
    return this.httpClient.get<Array<Note>>('http://localhost:3000/api/v1/notes',{headers:{
      'Authorization': "Bearer "+this.token
    }}).subscribe(notes => {
      this.notes = notes;
      this.notesSubject.next(this.notes);});
  }

  getNotes(): BehaviorSubject<Array<Note>> {
      // this.fetchNotesFromServer().subscribe(notes => {
      //   this.notes = notes;
      //   this.notesSubject.next(this.notes);
      // },
      // error => {
      //   console.log(error);
      //   });
      // console.log("Subject notes "+ this.notesSubject);
      return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
      this.notes.push(note);
      this.notesSubject.next(this.notes);
      return this.httpClient.post<Note>('http://localhost:3000/api/v1/notes', note,{headers:{
        'Authorization': "Bearer "+this.token
      }});
      
  }

  editNote(note: Note): Observable<Note> {
    return this.httpClient.put<Note>('http://localhost:3000/api/v1/notes/' + note.id, note,{headers:{
      'Authorization': "Bearer "+this.token
    }});

  }

  getNoteById(noteId:Number): Note {
    return this.notes.find(note => note.id == noteId);
  }
}
