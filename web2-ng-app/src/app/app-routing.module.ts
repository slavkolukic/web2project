import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './unsignedUser/authorisation/login/login.component';
import { RegisterComponent } from './unsignedUser/authorisation/register/register.component';
import { UnsignedHomeComponent } from './unsignedUser/unsigned-home/unsigned-home.component';
import { UnsignedFlightsComponent } from './unsignedUser/unsigned-flights/unsigned-flights.component';
import { UnsignedCarsComponent } from './unsignedUser/unsigned-cars/unsigned-cars.component';
import { SignedHomeComponent } from './signedUser/signed-home/signed-home.component';
import { SignedFlightsComponent } from './signedUser/signed-flights/signed-flights.component';
import { SignedCarsComponent } from './signedUser/signed-cars/signed-cars.component';
import { EditProfileComponent } from './signedUser/profile/edit-profile/edit-profile.component';
import { FriendsComponent } from './signedUser/profile/friends/friends.component';
import { UserFlightsComponent } from './signedUser/profile/user-flights/user-flights.component';
import { UserCarsComponent } from './signedUser/profile/user-cars/user-cars.component';
import { AirlineProfileComponent } from './unsignedUser/profiles/airline-profile/airline-profile.component';
import { RentACarProfileComponent } from './unsignedUser/profiles/rent-a-car-profile/rent-a-car-profile.component';
import { RacServiceEditProfileComponent } from './signedUser/rac-admin/rac-service-edit-profile/rac-service-edit-profile.component';
import { RacServiceCarsComponent } from './signedUser/rac-admin/rac-service-cars/rac-service-cars.component';
import { RacServiceOfficesComponent } from './signedUser/rac-admin/rac-service-offices/rac-service-offices.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: UnsignedHomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'flights', component: UnsignedFlightsComponent },
  { path: 'cars', component: UnsignedCarsComponent },
  { path: 'signed-home', component: SignedHomeComponent },
  { path: 'signed-flights', component: SignedFlightsComponent },
  { path: 'signed-cars', component: SignedCarsComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'friends', component: FriendsComponent },
  { path: 'user-flights', component: UserFlightsComponent },
  { path: 'user-cars', component: UserCarsComponent },
  { path: 'airline-profile', component: AirlineProfileComponent },
  { path: 'rent-a-car-profile', component: RentACarProfileComponent },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
