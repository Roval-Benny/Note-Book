import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent {

  id: Number;
  note:Note;
  constructor(private ns:NotesService, private rs:RouterService, private dialog: MatDialog, private route:ActivatedRoute) { }

  ngAfterViewInit(): void {

    setTimeout(()=>{
      this.route.params.subscribe(params => {
        this.id = params['noteId'];
        this.note = this.ns.getNoteById(this.id);
        console.log(this.id);
        console.log("This note "+this.note);
        this.openDialogBox();
      });
    })
    
  }

  openDialogBox() {
      const dialogBox = this.dialog.open(EditNoteViewComponent, {
        width: '500px',
        data: {
          note: this.note
        }
      });

      dialogBox.afterClosed().subscribe(result => {
        this.rs.routeBack();
      });
  }

}


