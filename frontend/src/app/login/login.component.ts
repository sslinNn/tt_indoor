import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
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
    this.authServise.login(this.password, this.username).subscribe(
      (response) => {
        console.log('User login successfully', response);
        location.reload();
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}
