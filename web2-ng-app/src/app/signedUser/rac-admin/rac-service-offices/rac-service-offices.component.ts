import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rac-service-offices',
  templateUrl: './rac-service-offices.component.html',
  styleUrls: ['./rac-service-offices.component.css'],
})
export class RacServiceOfficesComponent implements OnInit {
  newOfficeProcess = false;
  constructor() {}

  ngOnInit(): void {}

  newOfficeOn(): void {
    this.newOfficeProcess = true;
  }

  newOfficeOff(): void {
    this.newOfficeProcess = false;
  }
}
