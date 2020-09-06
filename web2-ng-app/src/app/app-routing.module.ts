import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './unsignedUser/authorisation/login/login.component';
import { RegisterComponent } from './unsignedUser/authorisation/register/register.component';
import { UnsignedHomeComponent } from './unsignedUser/unsigned-home/unsigned-home.component';
import { UnsignedFlightsComponent } from './unsignedUser/unsigned-flights/unsigned-flights.component';
import { UnsignedRacServicesComponent } from './unsignedUser/unsigned-cars/unsigned-rac-services/unsigned-rac-services.component';
import { UnsignedRacServicesCarsComponent } from './unsignedUser/unsigned-cars/unsigned-rac-services-cars/unsigned-rac-services-cars.component';
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
import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: UnsignedHomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'flights', component: UnsignedFlightsComponent },
  { path: 'rac-services', component: UnsignedRacServicesComponent },
  { path: 'rac-services/cars', component: UnsignedRacServicesCarsComponent },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'friends',
    component: FriendsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'user-flights',
    component: UserFlightsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'user-cars',
    component: UserCarsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'airline-profile',
    component: AirlineProfileComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'rent-a-car-profile',
    component: RentACarProfileComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'friends/add-new-friend',
    component: AddNewFriendComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: 'rac-service-edit-profile',
    component: RacServiceEditProfileComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'rac-service-cars',
    component: RacServiceCarsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'rac-service-offices',
    component: RacServiceOfficesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'rac-service-report',
    component: RacServiceReportComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'register-rac-company',
    component: RegisterRacCompanyComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'register-flight-company',
    component: RegisterFlightCompanyComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'register-administrator',
    component: RegisterAdministratorComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
