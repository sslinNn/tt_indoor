import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CatsService } from '../cats.service';
import { AuthService } from '../auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.css'],
})
export class CatsComponent implements OnInit {
  user_LS: any;
  user: any;
  userId: number = 0;
  data: any[] = [];
  cats: any;
  id: number = this.userId;
  isFormVisible: boolean = false;

  formData = {
    name: '',
    age: 0,
    breed: '',
    is_furry: false,
    breeder: this.userId,
  };

  constructor(
    private catsService: CatsService,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object // Внедрите платформу
  ) {}

  ngOnInit(): void {
    this.loadUser(); // Вызываем метод для загрузки пользователя
    this.loadcats();
  }

  loadUser(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Проверяем, находимся ли мы на клиенте
      this.user_LS = localStorage.getItem('user');
      this.user = JSON.parse(this.user_LS);
      this.userId = this.user ? this.user.id : 0; // Безопасно извлекаем userId
    }
  }

  loadcats() {
    this.catsService.get_list().subscribe(
      (response) => {
        this.cats = response;
        console.log('Vse kruto', response);
      },
      (error) => {
        console.error('Vse ploho', error);
      }
    );
  }

  create_cat() {
    this.catsService
      .create_cat(
        this.formData.name,
        this.formData.age,
        this.formData.breed,
        this.formData.is_furry,
        this.formData.breeder
      )
      .subscribe(
        (response) => {
          console.log('Cat created', response);
          this.loadcats();
        },
        (error) => {
          console.error('Cat not created', error);
        }
      );
  }

  cat_id: number = 0;
  delCat(catId: number) {
    this.catsService.del_cat(catId).subscribe(
      (response) => {
        console.log('Cat delited', response);
        location.reload();
      },
      (error) => {
        console.error('Cat not delited', error);
      }
    );
  }

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }
}
