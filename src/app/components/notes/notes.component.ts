import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SearchPipe } from 'src/app/core/pipes/search.pipe';
import { NoteService } from 'src/app/core/services/note.service';
import { Inote } from 'src/app/core/interfaces/inote';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, SearchPipe, DialogComponent],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  constructor(public dialog: MatDialog, private _NoteService: NoteService) { }

  searchValue: string = '';
  allNotes: Inote[] = [];

  ngOnInit(): void {
    this._NoteService.getUserNotes().subscribe({
      next: (response) => {
        if (response.msg == 'done') {
          this.allNotes = response.notes
        };
      }
    })
  }

  openDialog(noteData?: Inote): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '400px',
      width: '600px',
      data: { title: noteData?.title, content: noteData?.content, _id: noteData?._id },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()

    });
  };




  deleteNote(noteId: string, noteIndex: number): void {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        }).then(() => {
          this._NoteService.deleteNote(noteId).subscribe({
            next: (response) => {
              if (response.msg == "done") {
                this.allNotes.splice(noteIndex, 1);
                this.ngOnInit();
              }

            }
          })
        })
      }
    });

  }

  updateNote(noteDetail: Inote, noteIndex: number): void {
    this.openDialog({ title: noteDetail.title, content: noteDetail.content, _id: noteDetail._id })

  }


}
