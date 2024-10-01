import { Component, OnInit } from '@angular/core';
import { CatsService } from '../cats.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.css'],
})
export class CatComponent implements OnInit {
  constructor(
    private catsService: CatsService,
    private route: ActivatedRoute
  ) {}

  catId!: number;
  cat: any = {};
  isEditing: boolean = false;

  ngOnInit(): void {
    this.catId = +this.route.snapshot.paramMap.get('id')!;
    this.getCatData(this.catId);
  }

  getCatData(catId: number): void {
    this.catsService.get_cat_data(catId).subscribe(
      (response) => {
        this.cat = response;
        console.log('Cat data:', response);
      },
      (error) => {
        console.error('Cat data not found', error);
      }
    );
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveCatData(): void {
    this.catsService.update_cat_data(this.catId, this.cat).subscribe(
      (response) => {
        console.log('Cat data updated:', response);
        this.isEditing = false;
      },
      (error) => {
        console.error('Error updating cat data', error);
      }
    );
  }
}
