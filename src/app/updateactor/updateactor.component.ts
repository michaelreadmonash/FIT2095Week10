import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-updateactor',
  templateUrl: './updateactor.component.html',
  styleUrls: ['./updateactor.component.css']
})
export class UpdateactorComponent implements OnInit {

  actorsDB: any[] = [];
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";

  constructor(private db:DatabaseService) { }

  ngOnInit(): void {
    this.getActors()
  }

  //Get all Actors
  getActors() {
    this.db.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }

  // Update an Actor
  selectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }

  updateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.db.updateActor(this.actorId, obj).subscribe(result => {
      alert(this.fullName + " has been updated in the system.")
      this.getActors();
    });
  }
}
