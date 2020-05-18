import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './unsignedUser/authorisation/login/login.component';
import { RegisterComponent } from './unsignedUser/authorisation/register/register.component';
import { UnsignedHomeComponent } from './unsignedUser/unsigned-home/unsigned-home.component';
import { UnsignedFlightsComponent } from './unsignedUser/unsigned-flights/unsigned-flights.component';
import { UnsignedRacServicesComponent } from './unsignedUser/unsigned-cars/unsigned-rac-services/unsigned-rac-services.component';
import { UnsignedRacServicesCarsComponent } from './unsignedUser/unsigned-cars/unsigned-rac-services-cars/unsigned-rac-services-cars.component';
import { SignedHomeComponent } from './signedUser/signed-home/signed-home.component';
import { SignedFlightsComponent } from './signedUser/signed-flights/signed-flights.component';
import { SignedRacServicesComponent } from './signedUser/signed-cars/signed-rac-services/signed-rac-services.component';
import { SignedRacServicesCarsComponent } from './signedUser/signed-cars/signed-rac-services-cars/signed-rac-services-cars.component';
import { EditProfileComponent } from './signedUser/profile/edit-profile/edit-profile.component';
import { FriendsComponent } from './signedUser/profile/friends/friends.component';
import { UserFlightsComponent } from './signedUser/profile/user-flights/user-flights.component';
import { UserCarsComponent } from './signedUser/profile/user-cars/user-cars.component';
import { AirlineProfileComponent } from './unsignedUser/profiles/airline-profile/airline-profile.component';
import { RentACarProfileComponent } from './unsignedUser/profiles/rent-a-car-profile/rent-a-car-profile.component';
import { RacServiceEditProfileComponent } from './signedUser/rac-admin/rac-service-edit-profile/rac-service-edit-profile.component';
import { RacServiceCarsComponent } from './signedUser/rac-admin/rac-service-cars/rac-service-cars.component';
import { RacServiceOfficesComponent } from './signedUser/rac-admin/rac-service-offices/rac-service-offices.component';
import { RacServiceReportComponent } from './signedUser/rac-admin/rac-service-report/rac-service-report.component';
import { RegisterRacCompanyComponent } from './signedUser/admin/register-rac-company/register-rac-company.component';
import { RegisterFlightCompanyComponent } from './signedUser/admin/register-flight-company/register-flight-company.component';
import { RegisterAdministratorComponent } from './signedUser/admin/register-administrator/register-administrator.component';
import { AddNewFriendComponent } from './signedUser/profile/add-new-friend/add-new-friend.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: UnsignedHomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'flights', component: UnsignedFlightsComponent },
  { path: 'rac-services', component: UnsignedRacServicesComponent },
  { path: 'rac-services/cars', component: UnsignedRacServicesCarsComponent },
  { path: 'signed-home', component: SignedHomeComponent },
  { path: 'signed-flights', component: SignedFlightsComponent },
  { path: 'signed-rac-services', component: SignedRacServicesComponent },
  {
    path: 'signed-rac-services/cars',
    component: SignedRacServicesCarsComponent,
  },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'friends', component: FriendsComponent },
  { path: 'user-flights', component: UserFlightsComponent },
  { path: 'user-cars', component: UserCarsComponent },
  { path: 'airline-profile', component: AirlineProfileComponent },
  { path: 'rent-a-car-profile', component: RentACarProfileComponent },
  { path: 'friends/add-new-friend', component: AddNewFriendComponent },

  {
    path: 'rac-service-edit-profile',
    component: RacServiceEditProfileComponent,
  },
  {
    path: 'rac-service-cars',
    component: RacServiceCarsComponent,
  },
  {
    path: 'rac-service-offices',
    component: RacServiceOfficesComponent,
  },
  {
    path: 'rac-service-report',
    component: RacServiceReportComponent,
  },
  {
    path: 'register-rac-company',
    component: RegisterRacCompanyComponent,
  },
  {
    path: 'register-flight-company',
    component: RegisterFlightCompanyComponent,
  },
  {
    path: 'register-administrator',
    component: RegisterAdministratorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
