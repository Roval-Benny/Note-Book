import { Component } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent {

  notes: Array<Note> = [];
  constructor(private ns: NotesService) {
 
  }
  ngOnInit(){

    this.ns.getNotes().subscribe(
      (data) => {
        this.notes = data;  
        console.log(this.notes);
      }
    )
  }
}
