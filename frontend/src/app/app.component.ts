import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
// implements OnInit
export class AppComponent implements OnInit, OnChanges {
  username: string = '';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.me();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes',changes)
  }

  me() {
    this.authService.me().subscribe(
      (response) => {
        this.username = response['username'];
        console.log('username', this.username);
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }

  logout() {
    this.authService.logout().subscribe(() => {
      localStorage.removeItem('auth_token');
      this.username = '';
      location.reload();
      console.log('User logged out successfully');
    });
  }
}
