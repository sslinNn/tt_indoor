import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { error } from 'console';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authServise: AuthService, private router: Router) {}

  login() {
    this.authServise.login(this.username, this.password).subscribe(
      (response) => {
        localStorage.setItem('auth_token', response.auth_token);
        location.reload();
        console.log('User login successfully', response);
      },
      (error) => {
        console.error('User fucktup', error);
      }
    );
  }
}
