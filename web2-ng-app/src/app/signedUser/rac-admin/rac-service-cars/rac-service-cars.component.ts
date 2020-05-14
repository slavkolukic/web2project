import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rac-service-cars',
  templateUrl: './rac-service-cars.component.html',
  styleUrls: ['./rac-service-cars.component.css'],
})
export class RacServiceCarsComponent implements OnInit {
  newCarProcess = false;

  constructor() {}

  ngOnInit(): void {}

  newCarOn(): void {
    this.newCarProcess = true;
  }

  newCarOff(): void {
    this.newCarProcess = false;
  }
}
