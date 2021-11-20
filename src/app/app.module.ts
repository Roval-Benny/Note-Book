import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
// Material Layout
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// Material Data tables
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Route, Router, RouterModule, Routes } from '@angular/router';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NotesService } from './services/notes.service';
import { RouterService } from './services/router.service';
import { AuthenticationService } from './services/authentication.service';
import {  MatListModule, MatOptionModule, MatSelectModule } from '@angular/material';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { NoteViewComponent } from './note-view/note-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { NoteComponent } from './note/note.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';


const routes:Routes =[
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[CanActivateRouteGuard], children:[
    {path:'view/noteview',component:NoteViewComponent},
    {path:'view/listview',component:ListViewComponent},
    {path: 'note/:noteId/edit', component: EditNoteOpenerComponent, outlet: 'noteEditOutlet'}
  ] },
  {path:'',redirectTo:'/dashboard/view/listview',pathMatch:'full'},
]
@NgModule({
  declarations: [ AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    NoteComponent,
    NoteViewComponent,
    ListViewComponent,
    NoteTakerComponent,
    EditNoteOpenerComponent,
    EditNoteViewComponent ],
    
  imports: [ NoopAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatListModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    MatExpansionModule,
    MatDialogModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule],
  providers: [NotesService,
    RouterService,
    AuthenticationService,
    CanActivateRouteGuard,
    MatDialog ],
  bootstrap: [AppComponent ],
  entryComponents: [EditNoteViewComponent]
})

export class AppModule { }
