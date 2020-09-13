import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RacAdminService } from 'src/app/services/racAdmin/rac-admin.service';

@Component({
  selector: 'app-rac-service-report',
  templateUrl: './rac-service-report.component.html',
  styleUrls: ['./rac-service-report.component.css'],
})
export class RacServiceReportComponent implements OnInit {
  serviceRating: string = '';
  constructor(
    private racAdminService: RacAdminService,
    private authService: AuthService
  ) {
    this.getServiceRating();
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
}
