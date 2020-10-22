import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-actortomovie',
  templateUrl: './actortomovie.component.html',
  styleUrls: ['./actortomovie.component.css']
})
export class ActortomovieComponent implements OnInit {

  actorsDB: any[] = [];
  moviesDB: any[] = [];
  actor: string = '';
  movie: string = '';

  constructor(private db:DatabaseService) { }

  ngOnInit(): void {
    this.getActors();
    this.getMovies();
  }

  getActors() {
    this.db.getActors().subscribe((data:any[]) => {
      this.actorsDB = data;
    })
  }

  getMovies() {
    this.db.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    })
  }

  addMovie(item) {
    this.movie = item.title
  }

  addActor(item) {
    this.actor = item.name
  }

  addActorMovie(movieProp, actorProp) {
    this.db.addActorMovie(movieProp, actorProp).subscribe(result => {
      alert(actorProp + " has been added into " + movieProp);
    })
  }
}
