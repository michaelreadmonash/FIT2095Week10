import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-addactor',
  templateUrl: './addactor.component.html',
  styleUrls: ['./addactor.component.css']
})
export class AddactorComponent {

  fullName: string = "";
  bYear: number = 0;

  constructor(private db:DatabaseService) { }

    //Create a new Actor, POST request
    saveActor() {
      let obj = { name: this.fullName, bYear: this.bYear };
      this.db.createActor(obj).subscribe(result => {
        alert(this.fullName + " has been saved into the system.")
      });
    }
}
