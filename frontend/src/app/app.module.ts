import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { TokenStorageService } from './services/token-storage.service';
import { CreateComponent } from './views/create/create.component';
import { HomeComponent } from './views/home/home.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DetailsPageComponent } from './views/details-page/details-page.component';
import { SearchPageComponent } from './views/search-page/search-page.component';
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component';
import { FeedPageComponent } from './views/feed-page/feed-page.component';
import { TextboxCounterComponent } from './components/textbox-counter/textbox-counter.component';
import { FavouriteBtnComponent } from './components/favourite-btn/favourite-btn.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutPageComponent } from './views/about-page/about-page.component';
import { ContactPageComponent } from './views/contact-page/contact-page.component';
import { AuthorProfileComponent } from './components/author-profile/author-profile.component';
import { FollowButtonComponent } from './components/follow-button/follow-button.component';
import { AuthorControlsComponent } from './components/author-controls/author-controls.component';
import { EditSubmissionComponent } from './components/edit-submission/edit-submission.component';
import { SettingsPageComponent } from './views/settings-page/settings-page.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ProfilePageComponent } from './views/profile-page/profile-page.component';
import { ProfileBarComponent } from './components/profile-bar/profile-bar.component';
import { FollowersRowComponent } from './components/followers-row/followers-row.component';
import { SubmissionRowComponent } from './components/submission-row/submission-row.component';
import { CardContainerComponent } from './components/card-container/card-container.component';
import { UserFavouritesComponent } from './views/user-favourites/user-favourites.component';
import { UserSubmissionsComponent } from './views/user-submissions/user-submissions.component';
import { CategoryPageComponent } from './views/category-page/category-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    CreateComponent,
    HomeComponent,
    RecipeCardComponent,
    NotFoundComponent,
    DetailsPageComponent,
    SearchPageComponent,
    UserDropdownComponent,
    FeedPageComponent,
    TextboxCounterComponent,
    FavouriteBtnComponent,
    FooterComponent,
    AboutPageComponent,
    ContactPageComponent,
    AuthorProfileComponent,
    FollowButtonComponent,
    AuthorControlsComponent,
    EditSubmissionComponent,
    SettingsPageComponent,
    LoaderComponent,
    ProfilePageComponent,
    ProfileBarComponent,
    FollowersRowComponent,
    SubmissionRowComponent,
    CardContainerComponent,
    UserFavouritesComponent,
    UserSubmissionsComponent,
    CategoryPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [authInterceptorProviders, TokenStorageService, AuthGuard, GuestGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
