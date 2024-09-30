import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CatsService } from '../cats.service';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrl: './cats.component.css',
})
export class CatsComponent implements OnInit {
  data: any[] = [];
  cats: any;
  constructor(private catsService: CatsService) {}

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
}
