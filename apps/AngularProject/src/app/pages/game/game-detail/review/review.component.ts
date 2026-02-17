import { Component, OnInit } from '@angular/core';
import { IReview } from './review.model';
import { ReviewService } from './review.service';
import { faCheck, faTimes, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  reviews: IReview[] = [];
  faStar = faStar;

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.reviews = this.reviewService.getReviews();
  }
}
