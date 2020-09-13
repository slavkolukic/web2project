import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/Car';
import { AuthService } from 'src/app/services/auth.service';
import { RacAdminService } from 'src/app/services/racAdmin/rac-admin.service';

@Component({
  selector: 'app-rac-service-report',
  templateUrl: './rac-service-report.component.html',
  styleUrls: ['./rac-service-report.component.css'],
})
export class RacServiceReportComponent implements OnInit {
  serviceRating: string = '';
  allCars: Car[];
  constructor(
    private racAdminService: RacAdminService,
    private authService: AuthService
  ) {
    this.getServiceRating();
    this.getAllCars();
  }

  ngOnInit(): void {}

  getServiceRating() {
    this.racAdminService
      .getServiceRating(this.authService.getUserId())
      .subscribe((data) => {
        this.serviceRating = data.retVal;
        console.log(data.retVal);
      });
  }

  getAllCars() {
    this.racAdminService
      .getUserCars(this.authService.getUserId())
      .subscribe((data) => {
        this.allCars = data;
        console.log(this.allCars);
      });
  }

  getCarRating(rating: any, count: any): any {
    if (count == 0) return 'No ratings yet';
    return (rating - 0) / (count - 0) + ' / 5';
  }
}
