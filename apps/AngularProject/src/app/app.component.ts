import { Component, OnInit } from '@angular/core';
import { GameService } from '../app/pages/game/game.service';
import { DeveloperService } from '../app/pages/developer/developer.service';
import { IGame } from '../app/pages/game/game.model';
import { IDeveloper } from '../app/pages/developer/developer.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularProject';
  games: IGame[] = [];
  developers: IDeveloper[] = [];

  constructor(
    private gameService: GameService,
    private developerService: DeveloperService
  ) {}

  ngOnInit() {
    forkJoin([
      this.gameService.getGamesAsObservable(),
      this.developerService.getDevelopersAsObservable()
    ]).subscribe(([games, developers]) => {
      games.forEach(game => {
        game.developers = developers.filter(dev =>
          game.developerIds?.includes(dev.id)
        );
      });
  
      developers.forEach(dev => {
        dev.games = games.filter(game =>
          game.developerIds?.includes(dev.id)
        );
      });
  
      this.games = games;
      this.developers = developers;
  
      console.log('Data geladen 🚀', this.games, this.developers);
    });
  }
}
