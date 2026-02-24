import { Component, OnInit } from '@angular/core';
import { DeveloperService, IDeveloper } from '../developer.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-developer-list',
  templateUrl: './developer-list.component.html',
  styleUrls: ['./developer-list.component.scss']
})
export class DeveloperListComponent implements OnInit {
  developers: IDeveloper[] = [];
  loading = true;

  constructor(
    private developerService: DeveloperService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadDevelopers();
  }

  loadDevelopers(): void {
    this.loading = true;
    this.developerService.getAll().subscribe({
      next: (developers) => {
        this.developers = developers;
        this.loading = false;
        console.log('Developers loaded:', developers);
      },
      error: (error) => {
        console.error('Error loading developers:', error);
        this.loading = false;
      }
    });
  }

  onDelete(developer: IDeveloper): void {
    if (!developer) return;

    if (confirm(`Are you sure you want to delete ${developer.name}?`)) {
      const id = developer._id?.toString() || developer.id?.toString();

      if (id) {
        this.developerService.delete(id).subscribe({
          next: () => {
            console.log('Developer deleted successfully');
            this.loadDevelopers();
          },
          error: (err) => {
            console.error('Error deleting developer:', err);
            alert('Failed to delete developer');
          }
        });
      }
    }
  }
}