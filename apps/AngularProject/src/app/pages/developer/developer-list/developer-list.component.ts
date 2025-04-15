import { Component, OnInit } from '@angular/core';
import { IDeveloper } from '../developer.model';
import { DeveloperService } from '../developer.service';
import {
  faCheck,
  faSchool,
  faExclamationCircle,
  faMarsStroke,
  faPencilAlt,
  faScroll,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-developer-list',
  templateUrl: './developer-list.component.html',
  styleUrls: ['./developer-list.component.scss'],
})
export class DeveloperListComponent implements OnInit {
  developers: IDeveloper[] = [];
  faTrash = faTrash;
  faPencil = faPencilAlt;
  faScroll = faScroll;
  faCheck = faCheck;
  faSchool = faSchool;

  constructor(private developerService: DeveloperService) {}

  ngOnInit(): void {
    this.developers = this.developerService.getDevelopers();
  }
  deleteDeveloper(id: number): void {
    console.log('delete');
    this.developerService.deleteDeveloper(id);
  }
}
