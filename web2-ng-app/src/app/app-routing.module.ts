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

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: UnsignedHomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'flights', component: UnsignedFlightsComponent },
  { path: 'cars', component: UnsignedCarsComponent },
  { path: 'home', component: SignedHomeComponent },
  { path: 'flights', component: SignedFlightsComponent },
  { path: 'cars', component: SignedCarsComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'friends', component: FriendsComponent },
  { path: 'user-flights', component: UserFlightsComponent },
  { path: 'user-cars', component: UserCarsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
