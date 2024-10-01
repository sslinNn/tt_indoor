import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CatsService } from '../cats.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.css'], // исправлено styleUrl на styleUrls
})
export class CatsComponent implements OnInit {
  data: any[] = [];
  cats: any;
  id: number = 0;
  isFormVisible: boolean = false;

  formData = {
    name: '',
    age: 0,
    breed: '',
    is_furry: false,
    breeder: 0,
  };

  constructor(
    private catsService: CatsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadcats();
    this.me();
  }

  me() {
    this.authService.me().subscribe(
      (response) => {
        this.id = response['id'];
        this.formData.breeder = this.id; // Обновляем formData после получения id
        console.log('user id', this.id);
      },
      (error) => {
        console.error('Error', error);
      }
    );
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
          this.loadcats(); // Перезагружаем список после добавления кота
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
