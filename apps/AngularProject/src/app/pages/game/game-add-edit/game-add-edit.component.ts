import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IGame } from '../game.service';
import { GameService } from '../game.service';
import { DeveloperService } from '../../developer/developer.service';
import { UserService } from '../../user/user.service';
import { RecommendationsService } from '../../../services/recommendations.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-game-add-edit',
  templateUrl: './game-add-edit.component.html',
  styleUrls: ['./game-add-edit.component.scss'],
})
export class GameAddEditComponent implements OnInit {
  game: IGame | undefined;
  staticGame: IGame | undefined;
  gameId: string | null = null;
  gameExists: boolean = false;
  faCheck = faCheck;
  faTimes = faTimes;

  allDevelopers: any[] = [];
  selectedDeveloperIds: string[] = [];
  
  isCompletedByCurrentUser: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private developerService: DeveloperService,
    private userService: UserService,
    public authService: AuthService,
    private recommendationsService: RecommendationsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDevelopers();

    this.route.paramMap.subscribe((params) => {
      this.gameId = params.get('id');

      if (this.gameId) {
        this.gameExists = true;

        this.gameService.getById(this.gameId).subscribe({
          next: (game) => {
            this.staticGame = game;
            this.game = { ...game };
            this.selectedDeveloperIds = (game.developerIds || []).map(id => String(id));
            
            this.checkCompletedStatus();
            this.syncGameToNeo4j();
          },
          error: (err) => {
            console.error('Game not found', err);
            alert('Game not found');
            this.router.navigate(['game']);
          }
        });
      } else {
        this.game = {
          title: '',
          summary: '',
          genre: '',
          rating: 0,
          ageRating: '',
          price: 0,
          imageUrl: '',
          completed: false,
          releaseDate: new Date(),
          developerIds: [],
          reviewIds: [],
          developers: [],
          reviews: []
        };
      }
    });
  }

  checkCompletedStatus(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser && this.gameId) {
        console.log('🔍 Checking completed status from Neo4j...');
        
        this.recommendationsService.getUserCompletedGames(currentUser._id).subscribe({
            next: (completedGameIds) => {
                this.isCompletedByCurrentUser = completedGameIds.includes(this.gameId!);
                console.log('Completed status:', this.isCompletedByCurrentUser);
            },
            error: (err) => {
                console.error('Error checking completed status:', err);
            }
        });
    }
  }

  syncGameToNeo4j(): void {
    if (!this.game) return;
    
    const gameId = this.game._id || '';
    const title = this.game.title;
    const genre = this.game.genre;
    
    console.log('Syncing game to Neo4j:', gameId, title, genre);
    
    this.recommendationsService.syncGame(gameId, title, genre).subscribe({
        next: () => console.log('Game synced to Neo4j'),
        error: (err) => console.error('Error syncing game:', err)
    });
  }

  toggleCompleted(): void {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser || !this.gameId) {
      console.error('No user or game ID');
      return;
    }

    this.isCompletedByCurrentUser = !this.isCompletedByCurrentUser;
    const newStatus = this.isCompletedByCurrentUser;

    console.log('Toggling to:', newStatus);

    let updatedCompletedGameIds = [...(currentUser.completedGameIds || [])];
    
    if (newStatus) {
      if (!updatedCompletedGameIds.includes(this.gameId)) {
        updatedCompletedGameIds.push(this.gameId);
      }
    } else {
      updatedCompletedGameIds = updatedCompletedGameIds.filter(id => id !== this.gameId);
    }

    console.log('📝 Updating completedGameIds:', updatedCompletedGameIds);

    this.userService.update(currentUser._id, { completedGameIds: updatedCompletedGameIds } as any).subscribe({
      next: (updatedUser) => {
        console.log('✅ User updated successfully');
        this.authService.updateCurrentUser(updatedUser);
        
        if (newStatus && this.gameId) {
          console.log('➕ Adding to Neo4j');
          this.recommendationsService.recordGamePlayed(
            currentUser._id, 
            this.gameId,
            this.game?.rating || 0
          ).subscribe({
            next: () => {
              console.log('Added to Neo4j');
              this.checkCompletedStatus();
            },
            error: (err) => console.error('Error:', err)
          });
        } else if (!newStatus && this.gameId) {
          console.log('Removing from Neo4j');
          this.recommendationsService.removeGamePlayed(currentUser._id, this.gameId).subscribe({
            next: () => {
              console.log('Removed from Neo4j');
              this.checkCompletedStatus();
            },
            error: (err) => console.error('Error:', err)
          });
        }
      },
      error: (err) => {
        console.error('Error updating user:', err);
        this.isCompletedByCurrentUser = !newStatus;
        alert('Failed to update completed status');
      }
    });
  }

  loadDevelopers(): void {
    this.developerService.getAll().subscribe({
      next: (developers) => {
        this.allDevelopers = developers;
      },
      error: (err) => console.error('Error loading developers:', err)
    });
  }

  toggleDeveloper(developerId: string): void {
    const index = this.selectedDeveloperIds.indexOf(developerId);
    if (index > -1) {
      this.selectedDeveloperIds.splice(index, 1);
    } else {
      this.selectedDeveloperIds.push(developerId);
    }
  }

  isDeveloperSelected(developerId: string): boolean {
    return this.selectedDeveloperIds.includes(developerId);
  }

  onSubmit(): void {
    if (!this.game) {
      console.error('No game to submit');
      return;
    }

    this.game.developerIds = this.selectedDeveloperIds;

    if (this.gameExists && this.game._id) {
      this.gameService.update(this.game._id, this.game).subscribe({
        next: () => {
          console.log('Game updated successfully');
          this.router.navigate(['game']);
        },
        error: (err) => {
          console.error('Error updating game:', err);
        }
      });
    } else {
      const createGame = {
        title: this.game.title,
        summary: this.game.summary,
        genre: this.game.genre,
        releaseDate: this.game.releaseDate,
        price: this.game.price,
        ageRating: this.game.ageRating,
        imageUrl: this.game.imageUrl,
        developerIds: this.selectedDeveloperIds
      };

      this.gameService.create(createGame as any).subscribe({
        next: () => {
          console.log('Game created successfully');
          this.router.navigate(['game']);
        },
        error: (err) => {
          console.error('Error creating game:', err);
        }
      });
    }
  }
}