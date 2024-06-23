import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public credentials = {
    login: '',
    password: ''
  };

  public logged?: boolean;
  public logout?: boolean;
  public errorMessage?: string;

  constructor(public authService: AuthService, private router: Router) { }


  ngOnInit(): void { }

  signIn() {
    return this.authService.authenticate(this.credentials).subscribe((result) => {
      if (!result) {
        this.logged = false;
        this.errorMessage = 'Invalid login or password';
      } else {
        this.logout = false;
        this.errorMessage = undefined;
        
        this.credentials = {
          login: '',
          password: ''
        };

        this.router.navigate(['/']);
      }
    },
    (error: HttpErrorResponse) => {
      this.logged = false;
      if (error.status == 401) {
        this.errorMessage = 'Unauthorized! Invalid login or password!';
      } else {
        this.errorMessage = 'An error occurred during login. Please try again later.';
      }
    }
  );
  }
}
