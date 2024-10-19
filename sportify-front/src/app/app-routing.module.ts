import { TrainerReviewsComponent } from './Owner/Components/TRAINER/Trainer-Reviews/Trainer-Reviews.component';
import { CustomerAuthGuard } from './Customer/guards/customerauth.gurad';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerAddplaceComponent } from './Owner/Components/owner-addplace/owner-addplace.component';
import { OwnerAddplaceP1Component } from './Owner/Components/owner-addplace-p1/owner-addplace-p1.component';
import { OwnerAddplaceP2Component } from './Owner/Components/owner-addplace-p2/owner-addplace-p2.component';
import { OwnerAddplaceP3Component } from './Owner/Components/owner-addplace-p3/owner-addplace-p3.component';
import { OwnerDashboardComponent } from './Owner/Components/owner-dashboard/owner-dashboard.component';
import { OwnerDashboardContentComponent } from './Owner/Components/owner-dashboard-content/owner-dashboard-content.component'
import { OwnerAddplaceP4Component } from './Owner/Components/owner-addplace-p4/owner-addplace-p4.component';
import { OwnerSeereservationsComponent } from './Owner/Components/See-Reservations/owner-seereservations.component';
import { ReviwesComponent } from './Owner/Components/reviwes/reviwes.component';
import { ProfileUpdateComponent } from './Owner/Components/ProfileUpdate/ProfileUpdate.component';
import { SignUpComponent } from './SignUp/SignUp.component';
import { SignInComponent } from './SignIn/SignIn.component';
import { AboutUsComponent } from './Customer/Components/about-us/about-us.component';
import { ContactUsComponent } from './Customer/Components/contact-us/contact-us.component';
import { SeeMyPlacesComponent } from './Owner/Components/see-my-places/see-my-places.component';
import { PlaceDetailsComponent } from './Owner/Components/place-details/place-details.component';
import { HomeComponent } from './Customer/Components/home/home.component';
import { UserLayOutComponent } from './Customer/Components/user-lay-out/user-lay-out.component';
import { BookingComponent } from './Customer/Components/booking/booking.component';
import { CustomerFilterComponent } from './Customer/Components/customer-filter/customer-filter.component';
import { Customer_see_place_scheduleComponent } from './Customer/Components/See-Place-Schedule/customer_see_place_schedule.component';
import { ForgotPasswordComponent } from './Customer/Components/ForgotPassword/ForgotPassword.component';
import { ProfileNewComponent } from './Customer/Components/CustomerUpdateProfile/ProfileNew/ProfileNew/ProfileNew.component';
import { InfoComponent } from './Customer/Components/CustomerUpdateProfile/Info/Info/Info.component';
import { FavouritSportComponent } from './Customer/Components/CustomerUpdateProfile/FavouritSport/FavouritSport/FavouritSport.component';
import { SettingComponent } from './Customer/Components/CustomerUpdateProfile/Setting/Setting/Setting.component';
import { BookingUserComponent } from './Customer/Components/CustomerUpdateProfile/Booking/BookingUser/Booking.component';
import { Booking1Component } from './Customer/Components/CustomerUpdateProfile/booking1/booking1/booking1.component';
import { Booking2Component } from './Customer/Components/CustomerUpdateProfile/booking2/booking2/booking2.component';
import { Booking3Component } from './Customer/Components/CustomerUpdateProfile/booking3/booking3/booking3.component';
import { BlogListComponent } from './Customer/Components/blog-list/blog-list.component';
import { BlogDetailsComponent } from './ADMIN/Blog-Details/Blog-Details.component';
import { TrainerProfileComponent } from './Owner/Components/TRAINER/Trainer-profile/Trainer-profile.component';
import { TrainerReservationsComponent } from './Owner/Components/TRAINER/Trainer-Reservations/Trainer-Reservations.component';
import { TrainerScheduleComponent } from './Owner/Components/TRAINER/Trainer-schedule/Trainer-schedule.component';
import { SettingOwnerComponent } from './Owner/Components/Setting-Owner/Setting-Owner.component';
import { MemberShipFormComponent } from './Owner/Components/MemberShipCateogry/member-ship-form/member-ship-form.component';
import { MemberShipFormSilverComponent } from './Owner/Components/MemberShipCateogry/MemberShipFormSilver/MemberShipFormSilver.component';
import { MemberShipFormGoldenComponent } from './Owner/Components/MemberShipCateogry/MemberShipFormGolden/MemberShipFormGolden.component';
import { TrainerFilterComponent } from './Customer/Components/Trainer-Filter/Trainer-Filter.component';
import { SeeTrainerScheduleComponent } from './Customer/Components/See-Trainer-Schedule/See-Trainer-Schedule.component';
import { NotFoundComponent } from './Shared/not-found/not-found.component';
import { ownerGuard } from './owner.guard';
import { trainerGuard } from './trainer.guard';
import { BlogComponent1 } from './ADMIN/Add-Blog/Add-Blog.component';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminDashboardComponent } from './ADMIN/admin-dashboard/admin-dashboard.component';
import { AdminContentComponent } from './ADMIN/admin-content/admin-content.component';
import { AdminUsersComponent } from './ADMIN/admin-users/admin-users.component';
import { AdminOwnersComponent } from './ADMIN/admin-owners/admin-owners.component';
import { AdminTrainersComponent } from './ADMIN/admin-trainers/admin-trainers.component';
import { AdminPlacesComponent } from './ADMIN/admin-places/admin-places.component';
import { AdminBlogsComponent } from './ADMIN/admin-blogs/admin-blogs.component';
import { AdminSettingsComponent } from './ADMIN/admin-settings/admin-settings.component';

import { LoaderPageComponent } from './Shared/LoaderPage/LoaderPage.component';
import { TrainerBookingUserComponent } from './Customer/Components/CustomerUpdateProfile/TrainerBooking/TrainerBooking/TrainerBooking.component';
import { TrainerBooking1Component } from './Customer/Components/CustomerUpdateProfile/TrainerBooking1/TrainerBooking1/TrainerBooking1.component';
import { TrainerBooking2Component } from './Customer/Components/CustomerUpdateProfile/TrainerBooking2/TrainerBooking2/TrainerBooking2.component';
import { TrainerBooking3Component } from './Customer/Components/CustomerUpdateProfile/TrainerBooking3/TrainerBooking3/TrainerBooking3.component';
import { AdminAuthGuard } from './ADMIN/guards/adminauth.gurad';
const routes: Routes = [
  { path: 'loading', component: LoaderPageComponent },
  { path: "", redirectTo: "Customer", pathMatch: "full" },
  { path: 'Customer/Booking', component: BookingComponent, canActivate: [CustomerAuthGuard] },
  {
    path: 'Customer',
    component: UserLayOutComponent,
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: 'home', component: HomeComponent },
      { path: 'aboutus', component: AboutUsComponent },
      { path: 'contactus', component: ContactUsComponent },
      { path: 'Booking', component: BookingComponent },
      { path: 'Blogs', component: BlogListComponent },
      { path: 'blogs-details/:id', component: BlogDetailsComponent },
      { path: 'see-schedule/:id', component: Customer_see_place_scheduleComponent },
      { path: 'PFilter/:CategoryID/:Location', component: CustomerFilterComponent },
      { path: 'PFilter', redirectTo: "PFilter/ / " },
      // { path: 'see-schedule', component: Customer_see_place_scheduleComponent },
      { path: 'TFilter', component: TrainerFilterComponent },
      { path: 'TrainerSchedule/:id', component: SeeTrainerScheduleComponent },
      {
        path: 'Profile', component: ProfileNewComponent, canActivate: [CustomerAuthGuard], children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          { path: 'info', component: InfoComponent },
          { path: 'FavouriteSport', component: FavouritSportComponent },
          { path: 'AccountSettings', component: SettingComponent },
          {
            path: 'Booking', component: BookingUserComponent, children: [
              { path: '', redirectTo: 'UpcomingBooking', pathMatch: 'full' },
              { path: 'CompletedBooking', component: Booking1Component },
              { path: 'CanceledBooking', component: Booking2Component },
              { path: 'UpcomingBooking', component: Booking3Component },
            ]
          },
          {
            path: 'TBooking', component: TrainerBookingUserComponent, children: [
              { path: '', redirectTo: 'UpcomingTBooking', pathMatch: 'full' },
              { path: 'CompletedTBooking', component: TrainerBooking1Component },
              { path: 'CanceledTBooking', component: TrainerBooking2Component },
              { path: 'UpcomingTBooking', component: TrainerBooking3Component },
            ]
          },
        ]
      },
      { path: '**', component: NotFoundComponent }
    ]
  },
  {
    path: 'Owner',
    component: OwnerDashboardComponent, canActivate: [ownerGuard],
    children: [

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: OwnerDashboardContentComponent },
      { path: 'See-Reservations', component: OwnerSeereservationsComponent },
      { path: 'reviews', component: ReviwesComponent },
      { path: 'myplaces', component: SeeMyPlacesComponent },
      { path: 'place/:id', component: PlaceDetailsComponent },

      { path: 'MemberShipForm', component: MemberShipFormComponent },
      { path: 'MemberShipFormSilver', component: MemberShipFormSilverComponent },
      { path: 'MemberShipFormGolden', component: MemberShipFormGoldenComponent },
      { path: 'SettingOwner', component: SettingOwnerComponent },



      { path: "ProfileUpdate", component: ProfileUpdateComponent },
      {
        path: 'addplace', component: OwnerAddplaceComponent, children: [
          { path: '', redirectTo: 'P1', pathMatch: 'full' },
          { path: 'P1', component: OwnerAddplaceP1Component },
          { path: 'P2', component: OwnerAddplaceP2Component },
          { path: 'P3', component: OwnerAddplaceP3Component },
          { path: 'P4', component: OwnerAddplaceP4Component },
        ]
      },
      {
        path: 'editplace/:id', component: OwnerAddplaceComponent, children: [
          { path: '', redirectTo: 'P1', pathMatch: 'full' },
          { path: 'P1', component: OwnerAddplaceP1Component },
          { path: 'P2', component: OwnerAddplaceP2Component },
          { path: 'P3', component: OwnerAddplaceP3Component },
          { path: 'P4', component: OwnerAddplaceP4Component },
        ]
      },
      { path: 'profile', component: ProfileUpdateComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
    ]
  },
  {
    path: "Trainer", component: OwnerDashboardComponent, canActivate: [trainerGuard],
    children: [
      { path: '', redirectTo:'dashboard',pathMatch:'full' },
      { path: 'dashboard', component: OwnerDashboardContentComponent },
      { path: 'profile', component: TrainerProfileComponent },
      { path: 'schedule', component: TrainerScheduleComponent },
      { path: 'Reservations', component: TrainerReservationsComponent },
      { path: 'Reviews', component: TrainerReviewsComponent },
    ]
  }

  ,
  {
    path: "Admin", component: AdminDashboardComponent,canActivate:[AdminAuthGuard],
    children: [
      { path: '', redirectTo:'dashboard',pathMatch:'full' },
      { path: 'dashboard', component: AdminContentComponent },
      { path: 'Users', component: AdminUsersComponent },
      { path: 'Owners', component: AdminOwnersComponent },
      { path: 'Trainers', component: AdminTrainersComponent },
      { path: 'Places', component: AdminPlacesComponent },
      { path: 'Blogs', component: AdminBlogsComponent},
      {path:'Blog-Details/:id',component:BlogDetailsComponent},
      { path: 'add-Blog', component: BlogComponent1 },
      { path: 'Settings', component: AdminSettingsComponent },
    ]
  },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin/:returnedUrl', component: SignInComponent },
  { path: 'signin', component: SignInComponent },
  { path: '**', component: NotFoundComponent }
]




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
