import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeveloperService, IDeveloper } from '../developer.service';
import { faCheck, faTimes, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-developer-detail',
    templateUrl: './developer-detail.component.html',
    styleUrls: ['./developer-detail.component.scss']
})
export class DeveloperDetailComponent implements OnInit {
    developer: IDeveloper | undefined;
    faStar = faStar;
    faCheck = faCheck;
    faX = faTimes;

    constructor(
        private route: ActivatedRoute,
        private developerService: DeveloperService
    ) {}

    ngOnInit(): void {
        const developerId = this.route.snapshot.paramMap.get('id');
        console.log('Loading developer with ID:', developerId);
        
        if (developerId) {
            this.developerService.getById(developerId).subscribe({
                next: (developer) => {
                    console.log('Developer loaded from API:', developer);
                    this.developer = developer;
                },
                error: (err) => {
                    console.error('Error loading from API:', err);
                    this.developer = this.developerService.getDeveloperById(Number(developerId));
                    console.log('Developer from old method:', this.developer);
                }
            });
        } else {
            console.error('No developer ID found in route');
        }
    }
}