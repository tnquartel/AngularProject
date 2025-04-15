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

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'user', component: UserComponent },
  { path: 'about', component: AboutComponent },
  { path: 'user/new', pathMatch: 'full', component: UserAddEditComponent },
  { path: 'user/:id/edit', pathMatch: 'full', component: UserAddEditComponent },
  { path: 'game', component: GameComponent },
  { path: 'game/new', pathMatch: 'full', component: GameAddEditComponent },
  { path: 'game/:id/edit', pathMatch: 'full', component: GameAddEditComponent },
  { path: 'developer', component: DeveloperComponent },
  { path: 'developer/:id/edit', pathMatch: 'full', component: DeveloperAddEditComponent },
  {
    path: 'game/:id/detail',
    pathMatch: 'full',
    component: GameDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
