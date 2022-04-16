import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './views/create/create.component';
import { DetailsPageComponent } from './views/details-page/details-page.component';
import { FeedPageComponent } from './views/feed-page/feed-page.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './views/register/register.component';
import { SearchPageComponent } from './views/search-page/search-page.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { AboutPageComponent } from './views/about-page/about-page.component';
import { ContactPageComponent } from './views/contact-page/contact-page.component';
import { SettingsPageComponent } from './views/settings-page/settings-page.component';
import { ProfilePageComponent } from './views/profile-page/profile-page.component';
import { UserFavouritesComponent } from './views/user-favourites/user-favourites.component';
import { UserSubmissionsComponent } from './views/user-submissions/user-submissions.component';
import { CategoryPageComponent } from './views/category-page/category-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent, },
  { path: 'about', component: AboutPageComponent, },
  { path: 'contact', component: ContactPageComponent, },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
  { path: 'create', component: CreateComponent, canActivate: [AuthGuard] },
  { path: 'feed', component: FeedPageComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsPageComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchPageComponent },
  { path: 'category/:category', component: CategoryPageComponent },
  { path: 'profile/:user/favourites', component: UserFavouritesComponent },
  { path: 'profile/:user/submissions', component: UserSubmissionsComponent },
  { path: 'profile/:user', component: ProfilePageComponent },
  { path: 'recipe/:author/:slug', component: DetailsPageComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
