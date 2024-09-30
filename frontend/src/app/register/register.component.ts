import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  re_password: string = '';
  username: string = '';

  constructor(private authService: AuthService) {}

  register() {
    this.authService
      .register(this.email, this.password, this.re_password, this.username)
      .subscribe(
        (response) => {
          console.log('User registered successfully', response);
        },
        (error) => {
          console.error('Error during registration', error);
        }
      );
  }
}
