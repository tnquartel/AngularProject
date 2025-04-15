import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IDeveloper } from './developer.model';

@Injectable({
  providedIn: 'root',
})
export class DeveloperService {
  readonly developers: IDeveloper[] = [
    {
      id: 0,
      name: 'Nintendo',
      dateFounded: new Date(1889, 9, 23),
      summary: 'Nintendo is a japanese based game developer which also creates game consoles',
    },
    {
      id: 1,
      name: 'Gamefreak',
      dateFounded: new Date(1989, 4, 26),
      summary: 'Gamefreak is a japanese based game developer best known for their work on Pokemon',
    },
    {
      id: 2,
      name: 'Rockstar',
      dateFounded: new Date(1998, 12, 1),
      summary: 'Rockstar is the company behind the development of games like GTA',
    },
  ];

  getDevelopersAsObservable(): Observable<IDeveloper[]> {
    console.log('getDevelopersAsObservable aangeroepen');
    // 'of' is een rxjs operator die een Observable
    // maakt van de gegeven data.
    return of(this.developers);
  }

  getDeveloperById(id: number): IDeveloper {
    return this.developers.filter((c) => c.id == id)[0];
  }

  getDevelopers(): IDeveloper[] {
    return this.developers;
  }
  addDeveloper(developer: IDeveloper) {
    console.log(developer);
    developer.id = this.developers.length;
    this.developers.push(developer);
  }
  updateDeveloper(updatedDeveloper: IDeveloper) {
    console.log(updatedDeveloper);

    let developer = this.developers.find((obj) => obj.id == updatedDeveloper.id);
    let index = this.developers.indexOf(developer!);
    this.developers[index] = updatedDeveloper;
  }
  deleteDeveloper(id: number) {
    let developer = this.developers.find((obj) => obj.id == id);
    let index = this.developers.indexOf(developer!);
    this.developers.splice(index, 1);
  }
}
