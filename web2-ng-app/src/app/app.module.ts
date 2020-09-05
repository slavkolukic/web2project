import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './unsignedUser/authorisation/login/login.component';
import { RegisterComponent } from './unsignedUser/authorisation/register/register.component';
import { UnsignedHomeComponent } from './unsignedUser/unsigned-home/unsigned-home.component';
import { UnsignedFlightsComponent } from './unsignedUser/unsigned-flights/unsigned-flights.component';
import { UnsignedRacServicesCarsComponent } from './unsignedUser/unsigned-cars/unsigned-rac-services-cars/unsigned-rac-services-cars.component';
import { UnsignedRacServicesComponent } from './unsignedUser/unsigned-cars/unsigned-rac-services/unsigned-rac-services.component';
import { SignedHomeComponent } from './signedUser/signed-home/signed-home.component';
import { SignedFlightsComponent } from './signedUser/signed-flights/signed-flights.component';
import { SignedRacServicesComponent } from './signedUser/signed-cars/signed-rac-services/signed-rac-services.component';
import { SignedRacServicesCarsComponent } from './signedUser/signed-cars/signed-rac-services-cars/signed-rac-services-cars.component';
import { ProfileNavbarComponent } from './signedUser/profile/profile-navbar/profile-navbar.component';
import { EditProfileComponent } from './signedUser/profile/edit-profile/edit-profile.component';
import { FriendsComponent } from './signedUser/profile/friends/friends.component';
import { UserCarsComponent } from './signedUser/profile/user-cars/user-cars.component';
import { UserFlightsComponent } from './signedUser/profile/user-flights/user-flights.component';
import { AirlineProfileComponent } from './unsignedUser/profiles/airline-profile/airline-profile.component';
import { RentACarProfileComponent } from './unsignedUser/profiles/rent-a-car-profile/rent-a-car-profile.component';
import { RacServiceNavbarComponent } from './signedUser/rac-admin/rac-service-navbar/rac-service-navbar.component';
import { RacServiceEditProfileComponent } from './signedUser/rac-admin/rac-service-edit-profile/rac-service-edit-profile.component';
import { RacServiceCarsComponent } from './signedUser/rac-admin/rac-service-cars/rac-service-cars.component';
import { RacServiceOfficesComponent } from './signedUser/rac-admin/rac-service-offices/rac-service-offices.component';
import { RacServiceReportComponent } from './signedUser/rac-admin/rac-service-report/rac-service-report.component';
import { RegisterRacCompanyComponent } from './signedUser/admin/register-rac-company/register-rac-company.component';
import { RegisterFlightCompanyComponent } from './signedUser/admin/register-flight-company/register-flight-company.component';
import { RegisterAdministratorComponent } from './signedUser/admin/register-administrator/register-administrator.component';
import { AddNewFriendComponent } from './signedUser/profile/add-new-friend/add-new-friend.component';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from './guards/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UnsignedHomeComponent,
    UnsignedFlightsComponent,
    SignedHomeComponent,
    SignedFlightsComponent,
    ProfileNavbarComponent,
    EditProfileComponent,
    FriendsComponent,
    UserCarsComponent,
    UserFlightsComponent,
    AirlineProfileComponent,
    RentACarProfileComponent,
    RacServiceNavbarComponent,
    RacServiceEditProfileComponent,
    RacServiceCarsComponent,
    RacServiceOfficesComponent,
    RacServiceReportComponent,
    RegisterRacCompanyComponent,
    RegisterFlightCompanyComponent,
    RegisterAdministratorComponent,
    AddNewFriendComponent,
    UnsignedRacServicesCarsComponent,
    UnsignedRacServicesComponent,
    SignedRacServicesComponent,
    SignedRacServicesCarsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
