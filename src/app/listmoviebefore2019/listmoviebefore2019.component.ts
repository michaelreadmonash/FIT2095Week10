import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-listmoviebefore2019',
  templateUrl: './listmoviebefore2019.component.html',
  styleUrls: ['./listmoviebefore2019.component.css']
})
export class Listmoviebefore2019Component implements OnInit {

  moviesDB: any[] = [];

  constructor(private db:DatabaseService) { }

  ngOnInit(): void {
    this.getMovies2019();
  }

  getMovies2019() {
    this.db.getMovieBefore2019().subscribe((data: any[]) => {
      this.moviesDB = data;
    })
  }

}
