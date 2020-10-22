import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-listmovies',
  templateUrl: './listmovies.component.html',
  styleUrls: ['./listmovies.component.css']
})

export class ListmoviesComponent implements OnInit {

  moviesDB: any[] = [];

  constructor(private db:DatabaseService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.db.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    })
  }

}
