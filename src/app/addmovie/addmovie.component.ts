import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent {
  
  moviesDB: any[] = [];
  title: string = "";
  year: number = 0;

  constructor(private db:DatabaseService) { }

    //Create a new Movie, POST request
    saveMovie() {
      let obj = { title: this.title, year: this.year };
      this.db.createMovie(obj).subscribe(result => {
        alert(this.title + " has been saved into the system.")
      });
    }

}
