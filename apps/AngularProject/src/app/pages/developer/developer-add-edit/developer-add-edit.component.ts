import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IDeveloper } from '../developer.service';
import { DeveloperService } from '../developer.service';

@Component({
  selector: 'app-developer-add-edit',
  templateUrl: './developer-add-edit.component.html',
  styleUrls: ['./developer-add-edit.component.scss'],
})
export class DeveloperAddEditComponent implements OnInit {
  developer: IDeveloper | undefined;
  staticDeveloper: IDeveloper | undefined;
  developerId: string | null = null;
  developerExists: boolean = false;
  faCheck = faCheck;
  faTimes = faTimes;

  constructor(
    private route: ActivatedRoute,
    private developerService: DeveloperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.developerId = params.get('id');

      if (this.developerId) {
        this.developerExists = true;

        this.developerService.getById(this.developerId).subscribe({
          next: (developer) => {
            this.staticDeveloper = developer;
            this.developer = {
              ...developer,
              games: []
            };
          },
          error: (err) => {
            console.error('Developer not found', err);
            alert('Developer not found');
            this.router.navigate(['developer']);
          }
        });
        
      } else {
        this.developer = {
          name: '',
          dateFounded: new Date(),
          summary: '',
          games: [],
          gameIds: [],
          reviewIds: []
        };
      }
    });
  }

  onSubmit(): void {
    if (!this.developer) {
      console.error('No developer to submit');
      return;
    }

    console.log('Submit');
    if (this.developerExists && this.developer._id) {
      console.log('Update developer');
      this.developerService.update(this.developer._id, this.developer).subscribe({
        next: () => {
          console.log('Developer updated successfully');
          this.router.navigate(['developer']);
        },
        error: (err) => {
          console.error('Error updating developer:', err);
        }
      });
    } else {
      console.log('Add developer');
      const createDeveloper = {
        name: this.developer.name,
        dateFounded: this.developer.dateFounded,
        summary: this.developer.summary
      };
      
      this.developerService.create(createDeveloper).subscribe({
        next: () => {
          console.log('Developer created successfully');
          this.router.navigate(['developer']);
        },
        error: (err) => {
          console.error('Error creating developer:', err);
        }
      });
    }
  }
}