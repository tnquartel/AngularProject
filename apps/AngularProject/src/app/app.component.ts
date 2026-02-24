import { Component, OnInit } from '@angular/core';
import { GameService, IGame } from './pages/game/game.service';
import { DeveloperService } from './pages/developer/developer.service';
import { forkJoin } from 'rxjs';

// Tijdelijke interface voor Developer
interface IDeveloper {
  _id?: string;
  id?: number;
  name: string;
  games?: IGame[];
  gameIds?: (string | number)[];
}

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
    ]).subscribe(([games, developers]: [IGame[], IDeveloper[]]) => {
      // Link developers to games
      games.forEach(game => {
        if (!game.developers) {
          game.developers = [];
        }
        game.developers = developers.filter(dev => {
          const devId = dev._id || dev.id?.toString();
          return devId && game.developerIds?.includes(devId);
        });
      });
  
      // Link games to developers
      developers.forEach(dev => {
        if (!dev.games) {
          dev.games = [];
        }
        const devId = dev._id || dev.id?.toString();
        dev.games = games.filter(game => 
          devId && game.developerIds?.includes(devId)
        );
      });
  
      this.games = games;
      this.developers = developers;
  
      console.log('Data geladen 🚀', this.games, this.developers);
    });
  }
}