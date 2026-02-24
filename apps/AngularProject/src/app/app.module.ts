import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './pages/about/about.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { TopNavComponent } from './shared/top-nav/top-nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UserComponent } from './pages/user/user.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { UserAddEditComponent } from './pages/user/user-add-edit/user-add-edit.component';
import { GameComponent } from './pages/game/game.component';
import { GameListComponent } from './pages/game/game-list/game-list.component';
import { GameCardComponent } from './pages/game/game-list/game-card/game-card.component';
import { GameAddEditComponent } from './pages/game/game-add-edit/game-add-edit.component';
import { GameDetailComponent } from './pages/game/game-detail/game-detail.component';
import { ReviewComponent } from './pages/game/game-detail/review/review.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { DeveloperComponent } from './pages/developer/developer.component';
import { DeveloperListComponent } from './pages/developer/developer-list/developer-list.component';
import { DeveloperAddEditComponent } from './pages/developer/developer-add-edit/developer-add-edit.component';
import { DeveloperDetailComponent } from './pages/developer/developer-detail/developer-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomepageComponent,
    TopNavComponent,
    FooterComponent,
    UserComponent,
    UserListComponent,
    UserAddEditComponent,
    GameComponent,
    GameListComponent,
    GameCardComponent,
    GameAddEditComponent,
    GameDetailComponent,
    ReviewComponent,
    UserProfileComponent,
    DeveloperComponent,
    DeveloperListComponent,
    DeveloperAddEditComponent,
    DeveloperDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
