import { Component, OnInit, Input } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Route,
  Router,
} from '@angular/router';
import { IDeveloper } from '../developer.model';
import { DeveloperService } from '../developer.service';
import { faCheck, faTimes, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-developer-detail',
  templateUrl: './developer-detail.component.html',
  styleUrls: ['./developer-detail.component.scss'],
})
export class DeveloperDetailComponent implements OnInit {
  developer: IDeveloper | undefined;
  staticDeveloper: IDeveloper | undefined;
  developerId: string | null = null;
  developerExists: boolean = false;
  faCheck = faCheck;
  faX = faTimes;
  faStar = faStar;
  constructor(
    private developerService: DeveloperService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      const allDevelopers = this.developerService.getDevelopers(); // of uit AppComponent
      this.developer = allDevelopers.find(dev => dev.id === id);
    });
  }
}
