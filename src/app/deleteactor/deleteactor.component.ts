import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-deleteactor',
  templateUrl: './deleteactor.component.html',
  styleUrls: ['./deleteactor.component.css']
})

export class DeleteactorComponent implements OnInit {

  actorsDB:any[] = [];

  constructor(private db:DatabaseService) { }

  ngOnInit(): void {
    this.getActors();
  }

  //Get actors
  getActors() {
    this.db.getActors().subscribe((data:any[]) => {
      this.actorsDB = data;
    })
  }

  //Delete Actor
  deleteActor(item) {
    this.db.deleteActor(item._id).subscribe(result => {
      alert(item.name + " has been deleted from the system.")
      this.getActors();
    });
  }
}