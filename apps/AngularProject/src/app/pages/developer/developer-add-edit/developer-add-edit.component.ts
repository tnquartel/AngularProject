import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IDeveloper } from '../developer.model';
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
      //Edit
      if (this.developerId) {
        this.developerExists = true;
        this.staticDeveloper = this.developerService.getDeveloperById(Number(this.developerId));
        this.developer = {
          id: this.staticDeveloper.id,
          name: this.staticDeveloper.name,
          dateFounded: new Date(this.staticDeveloper.dateFounded),
          summary: this.staticDeveloper.summary,
          games: [], // tijdelijk leeg houden
          gameIds: this.staticDeveloper.games?.map(g => g.id) ?? [],
          reviews: [],
          reviewIds: this.staticDeveloper.reviews?.map(g => g.id) ?? [],
        };
        //Create
      } else {
        this.developer = {
          id: 0,
          name: '',
          dateFounded: new Date(),
          summary: '',
          games: [],
          gameIds: [],
          reviews: [],
          reviewIds: [],
        };
      }
    });
  }
  onSubmit(): void {
    console.log('Submit');
    if (this.developerExists) {
      console.log('Update developer');
      this.developerService.updateDeveloper(this.developer!);
      this.router.navigate(['developer']);
    } else {
      console.log('Add developer');
      this.developerService.addDeveloper(this.developer!);
      this.router.navigate(['developer']);
    }
  }
}
