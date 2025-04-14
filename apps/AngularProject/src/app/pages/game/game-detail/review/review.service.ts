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
        description:
          'I really like how the characters control and think the difficulty is just right',
        rating: 4,
        user: this.userService.getUserById(0),
      },
    ];
  }

  getReviews(): IReview[] {
    return this.reviews;
  }
}
