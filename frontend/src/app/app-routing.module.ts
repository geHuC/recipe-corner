import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { DetailsPageComponent } from './components/details-page/details-page.component';
import { FeedPageComponent } from './components/feed-page/feed-page.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
  { path: 'create', component: CreateComponent, canActivate: [AuthGuard] },
  { path: 'feed', component: FeedPageComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchPageComponent },
  { path: 'recipe/:author/:slug', component: DetailsPageComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
