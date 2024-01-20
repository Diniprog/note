import { Injectable } from '@angular/core';
import { Note } from '../interfaces/note';
import { BehaviorSubject, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  notes = new BehaviorSubject<Note[]>([]);
  
  constructor() { 
    const localStorageNotes = localStorage.getItem('notes');
    if (localStorageNotes){
      this.notes.next(JSON.parse(localStorageNotes))
    }
    this.notes.subscribe((notesArreay: Note[]) =>{
      localStorage.setItem('notes', JSON.stringify(notesArreay))
      
    });
  }

  createNote(newNote: Note) {
    this.notes
    .pipe(take(1))
    .subscribe((notesArreay: Note[])=>{
      notesArreay.unshift(newNote);
      this.notes.next(notesArreay);
    });
  }

  getNotes(): Observable<Note[]> {
    return this.notes;
  }

  deleteNote(noteId: number) {
    this.notes
    .pipe(take(1))
    .subscribe((notesArreay: Note[])=>{
    notesArreay.splice(noteId, 1);
    this.notes.next(notesArreay);
    });
  
  }
}
