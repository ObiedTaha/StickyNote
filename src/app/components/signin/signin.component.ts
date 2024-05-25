import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  constructor(private _FormBuilder: FormBuilder, private _AuthService: AuthService, private _ToastrService: ToastrService, private _Router: Router) { }
  isLoading: boolean = false;
  passwordShow:boolean=false;


  signinForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{3,12}$/)]],
  });


  handelsignin(form: FormGroup): void {
    this.isLoading = true;
    this._AuthService.signIn(form.value).subscribe({
      next: (response) => {
        
        this.isLoading = true;
        if (response.msg == 'done') {
          this._AuthService.setUserToken()
          localStorage.setItem('token',`3b8ny__`+response.token);
          this._Router.navigate(['./note']);
          this._ToastrService.success(response.msg);
        };
      },
      error: (err) => {
        this._ToastrService.error(err.error.msg);
        this.isLoading = false;
      }
    })


  }
}
