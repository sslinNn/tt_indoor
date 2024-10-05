import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from './auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  user: any;
  username: string = '';
  id: number = 0;

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Проверяем, находимся ли мы на клиенте
      const user_LS = localStorage.getItem('user');
      if (user_LS) {
        this.user = JSON.parse(user_LS);
        this.username = this.user.username;
      }
    }
  }

  logout() {
    this.authService.logout().subscribe(() => {
      if (isPlatformBrowser(this.platformId)) {
        // Проверяем, находимся ли мы на клиенте
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
      }
      location.reload();
      console.log('User logged out successfully');
    });
  }
}
