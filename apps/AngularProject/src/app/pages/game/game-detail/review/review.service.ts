import { Injectable } from '@angular/core';
import { IReview } from './review.model';
import { UserService } from '../../../user/user.service';

@Injectable({
  providedIn: 'root',
})

export class ReviewService {
  readonly reviews: IReview[];

  constructor(private userService: UserService) {
    this.reviews = [
      {
        id: 0,
        title: 'Very cool game',
        description: 'I really like how the characters control and think the difficulty is just right',
        rating: 4,
        user: this.userService.getUserById(0),
        datePlaced: new Date (2025, 4, 16),
        userId: 0,
        reviewedGame: [],
        reviewedGameId: [0, 2],
      },
      {
        id: 1,
        title: 'My favorite game',
        description: 'I think I will never play a game better than this one',
        rating: 5,
        user: this.userService.getUserById(1),
        datePlaced: new Date (2025, 3, 14),
        userId: 1,
        reviewedGame: [],
        reviewedGameId: [1],
      },
      {
        id: 2,
        title: 'Pretty mid',
        description: 'The most middle of the road game I ever played',
        rating: 3,
        user: this.userService.getUserById(1),
        datePlaced: new Date (2025, 3, 21),
        userId: 1,
        reviewedGame: [],
        reviewedGameId: [0, 2],
      },
      {
        id: 3,
        title: 'Worst developer ever',
        description: 'Litterly the worst company to ever exist.',
        rating: 1,
        user: this.userService.getUserById(0),
        datePlaced: new Date (2025, 4, 1),
        userId: 0,
        reviewedDeveloper: [],
        reviewedDeveloperId: [0],
      },
    ];
  }

  getReviews(): IReview[] {
    return this.reviews;
  }
}
