import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../interfaces/note';
import { CommonModule } from '@angular/common';
// import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent implements OnInit{
  route = inject(ActivatedRoute);
  router = inject(Router)
  notesService = inject(NotesService)
  noteId: any;
  note: Note | undefined;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.noteId = params.get('id');
      });
      this.notesService.getNotes()
      .subscribe((note: Note[]) =>{
        this.note = note[this.noteId]
        })
      }

      deletNote(){
        this.notesService.deleteNote(this.noteId)
        this.router.navigate([''])
      }
  }
