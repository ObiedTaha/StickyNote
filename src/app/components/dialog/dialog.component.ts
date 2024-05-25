import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoteService } from 'src/app/core/services/note.service';
import { Inote } from 'src/app/core/interfaces/inote';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatDialogModule, MatButtonModule, MatInputModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  constructor(private _FormBuilder: FormBuilder, private _NoteService: NoteService, public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Inote) {

  }


  noteForm: FormGroup = this._FormBuilder.group({
    title: [this.data.title ? this.data.title : ''],
    content: [this.data.content ? this.data.content : '']
  });


  handelUserAction(form: FormGroup): void {
    if (!this.data.title && !this.data.content)
      this.addNewNote(form.value);
    else
      this.updateNote(form.value)

  };



  addNewNote(newNote: Inote): void {
    this._NoteService.AddNote(newNote).subscribe({
      next: (response) => {
        if (response.msg == 'done') {
          this.dialogRef.close();
        }
      }
    })
  };

  updateNote(newNote: Inote): void {
    this._NoteService.updateNote(newNote,this.data._id).subscribe({
      next:(response)=>{
        if(response.msg=='done'){
          this.dialogRef.close()
        }
        
      }
    })
  }





}
