import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent {

  errMessage:string;
  note:Note = new Note();
  constructor(private ns:NotesService) {}

  onDone(){
    if(this.note.text.length>0 || this.note.title.length>0){
      this.ns.addNote(this.note).subscribe(
        (data)=>{
          console.log(data);
          this.note = new Note();
        },
        (err)=>{
          this.errMessage = "Http failure response for http://localhost:3000/api/v1/notes: 404 Not Found";
        }
      )
    }
    else{
      this.errMessage = "Title and Text both are required fields";
    }

  }
}
