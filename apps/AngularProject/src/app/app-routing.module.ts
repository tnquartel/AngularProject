import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { UserAddEditComponent } from './pages/user/user-add-edit/user-add-edit.component';
import { UserComponent } from './pages/user/user.component';
import { GameComponent } from './pages/game/game.component';
import { GameAddEditComponent } from './pages/game/game-add-edit/game-add-edit.component';
import { GameDetailComponent } from './pages/game/game-detail/game-detail.component';
import { DeveloperComponent } from './pages/developer/developer.component';
import { DeveloperAddEditComponent } from './pages/developer/developer-add-edit/developer-add-edit.component';
import { DeveloperDetailComponent } from './pages/developer/developer-detail/developer-detail.component';
import { LoginComponent } from './pages/auth/login.component';
import { RegisterComponent } from './pages/auth/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'about', component: AboutComponent },

  // Auth
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // User
  { path: 'user/new', component: UserAddEditComponent, canActivate: [AuthGuard] },
  { path: 'user/:id/edit', component: UserAddEditComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  
  // Game
  { path: 'game/new', component: GameAddEditComponent, canActivate: [AuthGuard] },
  { path: 'game/:id/edit', component: GameAddEditComponent, canActivate: [AuthGuard] },
  { path: 'game/:id/detail', component: GameDetailComponent },
  { path: 'game', component: GameComponent },
  
  // Developer
  { path: 'developer/new', component: DeveloperAddEditComponent, canActivate: [AuthGuard] },
  { path: 'developer/:id/edit', component: DeveloperAddEditComponent, canActivate: [AuthGuard] },
  { path: 'developer/:id/detail', component: DeveloperDetailComponent },
  { path: 'developer', component: DeveloperComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
