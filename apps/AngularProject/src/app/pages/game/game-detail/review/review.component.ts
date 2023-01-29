import { Component, OnInit } from '@angular/core';
import { IReview } from './review.model';
import { ReviewService } from './review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  reviews: IReview[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.reviews = this.reviewService.getReviews();
  }
}
