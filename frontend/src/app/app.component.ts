import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  user: any;
  username: string = '';
  id: number = 0;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      const user_LS = localStorage.getItem('user');
      if (user_LS) {
        this.user = JSON.parse(user_LS);
        this.username = this.user.username;
      }
    }
  }

  logout() {
    this.authService.logout().subscribe(() => {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
      }
      location.reload();
      console.log('User logged out successfully');
    });
  }
}
