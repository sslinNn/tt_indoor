import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CatsService } from '../cats.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.css'],
})
export class CatsComponent implements OnInit {
  user_LS: any = localStorage.getItem('user');
  user: any = JSON.parse(this.user_LS);
  userId: number = this.user.id;
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
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadcats();
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
