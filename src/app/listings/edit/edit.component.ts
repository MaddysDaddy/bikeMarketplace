import { Component, OnInit, Input } from '@angular/core';
import { Bike } from '../../bike';
import { DataService } from '../../services/data.service';
import { NgForm } from '@angular/forms';
import { User } from '../../user';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Input()
  // bikes: Array<Bike> = [];
  user: User;

  constructor(private dataService: DataService) { }


  createBike(bike: Bike) {
    console.log('edit component: ', bike);
    return this.dataService.create(bike)
      .subscribe(savedBike => {
        this.user.bikes.push(savedBike);
      });
  }


  update(e: Event, id, form: NgForm) {
    console.log(form.value);
    console.log(id);
    return this.dataService.update(id, form.value)
      .subscribe(updatedBike => {
        console.log(updatedBike, 'Updated.');
      });
  }


  ngOnInit() {

  }

}
