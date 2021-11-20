import { Component, Input } from '@angular/core';
import { Note } from '../note';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {

  @Input() note: Note;
  
  constructor(private rs:RouterService) { }

  edit(id:any){
    console.log(id);
    this.rs.routeToEditNoteView(id);
  }
}
