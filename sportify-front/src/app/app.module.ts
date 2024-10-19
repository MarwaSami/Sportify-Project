import { DialogModalComponent } from './Shared/dialog-modal/dialog-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpInterceptor } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SeeMyPlacesComponent } from './Owner/Components/see-my-places/see-my-places.component';
import { PlaceDetailsComponent } from './Owner/Components/place-details/place-details.component';
import { CardBodyComponent } from './Owner/Components/card-body/card-body.component';
import { ServicesPipe } from './Owner/Pipes/services.pipe';
import { OwnerAddplaceComponent } from './Owner/Components/owner-addplace/owner-addplace.component';
import { OwnerAddplaceP1Component } from './Owner/Components/owner-addplace-p1/owner-addplace-p1.component';
import { OwnerAddplaceP2Component } from './Owner/Components/owner-addplace-p2/owner-addplace-p2.component';
import { OwnerAddplaceP3Component } from './Owner/Components/owner-addplace-p3/owner-addplace-p3.component';
import { OwnerDashboardComponent } from './Owner/Components/owner-dashboard/owner-dashboard.component';
import { OwnerSeereservationsComponent } from './Owner/Components/See-Reservations/owner-seereservations.component';
import { OwnerDashboardContentComponent } from './Owner/Components/owner-dashboard-content/owner-dashboard-content.component';
import { OwnerAddplaceP4Component } from './Owner/Components/owner-addplace-p4/owner-addplace-p4.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { ReviwesComponent } from './Owner/Components/reviwes/reviwes.component';
import { MemberShipFormComponent } from './Owner/Components/MemberShipCateogry/member-ship-form/member-ship-form.component';
import { MemberShipFormSilverComponent } from './Owner/Components/MemberShipCateogry/MemberShipFormSilver/MemberShipFormSilver.component';
import { MemberShipFormGoldenComponent } from './Owner/Components/MemberShipCateogry/MemberShipFormGolden/MemberShipFormGolden.component';
import { ProfileUpdateComponent } from './Owner/Components/ProfileUpdate/ProfileUpdate.component';
import { SignUpComponent } from './SignUp/SignUp.component';
import { SignInComponent } from './SignIn/SignIn.component';
import { NavbarComponent } from './Customer/Components/navbar/navbar.component';
import { FooterComponent } from './Customer/Components/footer/footer.component';
import { HomeComponent } from './Customer/Components/home/home.component';
import { UserLayOutComponent } from './Customer/Components/user-lay-out/user-lay-out.component';
import { AboutUsComponent } from './Customer/Components/about-us/about-us.component';
import { ContactUsComponent } from './Customer/Components/contact-us/contact-us.component';
import { BookingComponent } from './Customer/Components/booking/booking.component';
import { CustomerFilterComponent } from './Customer/Components/customer-filter/customer-filter.component';
import { FilterCardComponent } from './Customer/Components/filter-card/filter-card.component';
import { Customer_see_place_scheduleComponent } from './Customer/Components/See-Place-Schedule/customer_see_place_schedule.component';
import { ForgotPasswordComponent } from './Customer/Components/ForgotPassword/ForgotPassword.component';
import { RouterOutlet } from '@angular/router';
import { ProfileNewComponent } from './Customer/Components/CustomerUpdateProfile/ProfileNew/ProfileNew/ProfileNew.component';
import { InfoComponent } from './Customer/Components/CustomerUpdateProfile/Info/Info/Info.component';
import { SettingComponent } from './Customer/Components/CustomerUpdateProfile/Setting/Setting/Setting.component';
import { Booking1Component } from './Customer/Components/CustomerUpdateProfile/booking1/booking1/booking1.component';
import { Booking2Component } from './Customer/Components/CustomerUpdateProfile/booking2/booking2/booking2.component';
import { Booking3Component } from './Customer/Components/CustomerUpdateProfile/booking3/booking3/booking3.component';
import { BookingUserComponent } from './Customer/Components/CustomerUpdateProfile/Booking/BookingUser/Booking.component';
import { FavouritSportComponent } from './Customer/Components/CustomerUpdateProfile/FavouritSport/FavouritSport/FavouritSport.component';
import { BlogListComponent } from './Customer/Components/blog-list/blog-list.component';
import { BlogDetailsComponent } from './ADMIN/Blog-Details/Blog-Details.component';
import { TrainerProfileComponent } from './Owner/Components/TRAINER/Trainer-profile/Trainer-profile.component';
import { TrainerReservationsComponent } from './Owner/Components/TRAINER/Trainer-Reservations/Trainer-Reservations.component';
import { TrainerScheduleComponent } from './Owner/Components/TRAINER/Trainer-schedule/Trainer-schedule.component';
import { SettingOwnerComponent } from './Owner/Components/Setting-Owner/Setting-Owner.component';
import { TrainerFilterComponent } from './Customer/Components/Trainer-Filter/Trainer-Filter.component';
import { TrainerReviewsComponent } from './Owner/Components/TRAINER/Trainer-Reviews/Trainer-Reviews.component';
import { SeeTrainerScheduleComponent } from './Customer/Components/See-Trainer-Schedule/See-Trainer-Schedule.component';
import { AuthInterceptor } from './Shared/Services/Interceptor/Auth.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { AdminContentComponent } from './ADMIN/admin-content/admin-content.component';
import { AdminDashboardComponent } from './ADMIN/admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './ADMIN/admin-users/admin-users.component';
import { AdminOwnersComponent } from './ADMIN/admin-owners/admin-owners.component';
import { AdminTrainersComponent } from './ADMIN/admin-trainers/admin-trainers.component';
import { AdminPlacesComponent } from './ADMIN/admin-places/admin-places.component';
import { AdminSettingsComponent } from './ADMIN/admin-settings/admin-settings.component';
import { AdminBlogsComponent } from './ADMIN/admin-blogs/admin-blogs.component';
import { NotFoundComponent } from './Shared/not-found/not-found.component';
import { BlogComponent } from './Customer/Components/blog/blog.component';
import { BlogComponent1 } from './ADMIN/Add-Blog/Add-Blog.component';
import { NgxPaginationModule } from "ngx-pagination";
import { LoaderPageComponent } from './Shared/LoaderPage/LoaderPage.component';
import { TDialogModalComponent } from './Shared/dialog-modal -Tainer/Tdialog-modal.component';
import { TrainerBookingUserComponent } from './Customer/Components/CustomerUpdateProfile/TrainerBooking/TrainerBooking/TrainerBooking.component';
import { TrainerBooking1Component } from './Customer/Components/CustomerUpdateProfile/TrainerBooking1/TrainerBooking1/TrainerBooking1.component';
import { TrainerBooking2Component } from './Customer/Components/CustomerUpdateProfile/TrainerBooking2/TrainerBooking2/TrainerBooking2.component';
import { TrainerBooking3Component } from './Customer/Components/CustomerUpdateProfile/TrainerBooking3/TrainerBooking3/TrainerBooking3.component';
import { RatingComponent } from './Shared/rating/rating.component';

@NgModule({
  declarations: [
    BlogDetailsComponent,
    BlogListComponent,
    BlogComponent,
    BlogComponent1,
    AppComponent,
    OwnerAddplaceComponent,
    OwnerAddplaceP1Component,
    OwnerAddplaceP2Component,
    OwnerAddplaceP3Component,
    OwnerDashboardComponent,
    OwnerDashboardContentComponent,
    OwnerAddplaceP4Component,
    OwnerSeereservationsComponent,
    ReviwesComponent,
    MemberShipFormComponent,
    MemberShipFormSilverComponent,
    MemberShipFormGoldenComponent,
    ProfileUpdateComponent,
    SignUpComponent,
    SignInComponent,
    AboutUsComponent,
    ContactUsComponent,
    SeeMyPlacesComponent,
    PlaceDetailsComponent,
    CardBodyComponent,
    ServicesPipe,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    UserLayOutComponent,
    ForgotPasswordComponent,
    BookingComponent,
    CustomerFilterComponent,
    FilterCardComponent,
    Customer_see_place_scheduleComponent,
    ProfileNewComponent,
    InfoComponent,
    BookingUserComponent,
    SettingComponent,
    TrainerBookingUserComponent,
    TrainerBooking1Component,
    TrainerBooking2Component,
    TrainerBooking3Component,
    Booking1Component,
    Booking2Component,
    Booking3Component,
    FavouritSportComponent,
    BlogListComponent,
    BlogComponent,
    BlogDetailsComponent,
    TrainerProfileComponent,
    TrainerProfileComponent,
    TrainerReservationsComponent,
    TrainerScheduleComponent,
    SettingOwnerComponent,
    SeeTrainerScheduleComponent,
    TrainerFilterComponent,
    NotFoundComponent,
    TrainerReviewsComponent,
    LoaderPageComponent,
    DialogModalComponent,
    TDialogModalComponent,
    AdminContentComponent,
    AdminDashboardComponent,
    AdminUsersComponent,
    AdminOwnersComponent,
    AdminTrainersComponent,
    AdminPlacesComponent,
    AdminBlogsComponent,
    AdminSettingsComponent,
    RatingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    FormsModule,
    HttpClientModule,
    RouterOutlet,
    MatSnackBarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
  ],
  // Array of intercpetor add it my class and mutli : pass on all of them by default
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
