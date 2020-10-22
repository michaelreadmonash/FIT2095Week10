import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-deletemovie',
  templateUrl: './deletemovie.component.html',
  styleUrls: ['./deletemovie.component.css']
})
export class DeletemovieComponent implements OnInit {

  moviesDB: any[] = [];

  constructor(private db:DatabaseService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  //Get Movies
  getMovies() {
    this.db.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    })
  }

  //Delete Movie
  deleteMovie(item) {
    this.db.deleteMovie(item._id).subscribe(result => {
      alert(item.title + " has been deleted from the system.")
      this.getMovies();
    });
  }

}
