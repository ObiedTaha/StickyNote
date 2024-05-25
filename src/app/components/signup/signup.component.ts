import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(private _FormBuilder: FormBuilder, private _AuthService: AuthService,private _ToastrService:ToastrService,private _Router:Router) { }
  isLoading: boolean = false;
  passwordShow:boolean=false;


  signupForm: FormGroup = this._FormBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{3,12}$/)]],
    age: ['', [Validators.required,Validators.pattern(/^([2-7][0-9]|80)$/)]],                                         
    phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
  });


  handelSignup(form: FormGroup): void {
    this.isLoading=true;
   
    this._AuthService.signUp(form.value).subscribe({
      next: (response) => {
        this._ToastrService.success(response.msg);
        this._Router.navigate(['/signin']);
        this.isLoading=true;
        
      },
      error: (err) => {
        this._ToastrService.error(err.error.msg);
        this.isLoading=false;


      }
    })
  }

}
