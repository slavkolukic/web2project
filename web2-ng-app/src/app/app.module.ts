import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './unsignedUser/authorisation/login/login.component';
import { RegisterComponent } from './unsignedUser/authorisation/register/register.component';
import { UnsignedHomeComponent } from './unsignedUser/unsigned-home/unsigned-home.component';
import { UnsignedFlightsComponent } from './unsignedUser/unsigned-flights/unsigned-flights.component';
import { UnsignedCarsComponent } from './unsignedUser/unsigned-cars/unsigned-cars.component';
import { SignedHomeComponent } from './signedUser/signed-home/signed-home.component';
import { SignedFlightsComponent } from './signedUser/signed-flights/signed-flights.component';
import { SignedCarsComponent } from './signedUser/signed-cars/signed-cars.component';
import { ProfileNavbarComponent } from './signedUser/profile/profile-navbar/profile-navbar.component';
import { EditProfileComponent } from './signedUser/profile/edit-profile/edit-profile.component';
import { FriendsComponent } from './signedUser/profile/friends/friends.component';
import { UserCarsComponent } from './signedUser/profile/user-cars/user-cars.component';
import { UserFlightsComponent } from './signedUser/profile/user-flights/user-flights.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UnsignedHomeComponent,
    UnsignedFlightsComponent,
    UnsignedCarsComponent,
    SignedHomeComponent,
    SignedFlightsComponent,
    SignedCarsComponent,
    ProfileNavbarComponent,
    EditProfileComponent,
    FriendsComponent,
    UserCarsComponent,
    UserFlightsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
