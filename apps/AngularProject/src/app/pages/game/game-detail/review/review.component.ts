import { Component, Input, OnInit } from '@angular/core';
import { ReviewService, IReview, ICreateReview } from './review.service';
import { faCheck, faTimes, faStar } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  @Input() gameId?: string;
  @Input() developerId?: string;

  reviews: IReview[] = [];
  newReview: ICreateReview | null = null;
  showForm = false;

  faStar = faStar;
  faCheck = faCheck;
  faTimes = faTimes;

  constructor(
    private reviewService: ReviewService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    const entityId = this.gameId || this.developerId;
    if (entityId) {
      this.reviewService.getByEntity(entityId).subscribe({
        next: (reviews) => {
          this.reviews = reviews;
          console.log('Reviews loaded:', reviews);
        },
        error: (err) => console.error('Error loading reviews:', err)
      });
    }
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (this.showForm) {
      const entityId = this.gameId || this.developerId;
      const currentUser = this.authService.currentUserValue;
      const userId = currentUser?._id || '000000000000000000000000';
      this.newReview = {
        title: '',
        description: '',
        rating: 5,
        userId: userId, 
        reviewType: this.gameId ? 'game' : 'developer',
        reviewedEntityId: entityId || ''
      };
    } else {
      this.newReview = null;
    }
  }

  submitReview(): void {
    if (this.newReview) {
      this.reviewService.create(this.newReview).subscribe({
        next: () => {
          this.loadReviews();
          this.toggleForm();
        },
        error: (err) => console.error('Error creating review:', err)
      });
    }
  }

  deleteReview(reviewId: string): void {
    if (confirm('Are you sure you want to delete this review?')) {
      this.reviewService.delete(reviewId).subscribe({
        next: () => this.loadReviews(),
        error: (err) => console.error('Error deleting review:', err)
      });
    }
  }
}