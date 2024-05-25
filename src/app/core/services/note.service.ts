import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inote } from '../interfaces/inote';
import { environment } from 'src/app/environments/environment.developments';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private _HttpClient: HttpClient) { }


  AddNote(newNote: Inote): Observable<any> {
    return this._HttpClient.post(environment.noteUrl, newNote);
  };

  getUserNotes(): Observable<any> {
    return this._HttpClient.get(environment.noteUrl);
  };

  deleteNote(noteId: string): Observable<any> {
    return this._HttpClient.delete(`${environment.noteUrl}/${noteId}`);
  };

  updateNote(newNote: Inote, noteId: string): Observable<any> {
    return this._HttpClient.put(`${environment.noteUrl}/${noteId}`,newNote);
  }
}
