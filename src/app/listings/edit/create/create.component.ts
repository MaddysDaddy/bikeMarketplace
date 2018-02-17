import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Bike } from '../../../bike';
import { DataService } from '../../../services/data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  @Output()
  newBike = new EventEmitter();

  bike: Bike = new Bike();

  constructor(private dataService: DataService) { }

  onSubmit(e: Event, form: NgForm) {
    e.preventDefault();

    this.bike = form.value;
    console.log(this.bike);

    this.newBike.emit(this.bike);

    this.bike = new Bike();

    form.reset();
  }



  ngOnInit() {
  }

}
