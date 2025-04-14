import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly users: IUser[] = [
    {
      id: 0,
      name: 'Thomas',
      age: 21,
      emailAdress: 'thomasquartel@icloud.com',
      phoneNumber: '0612345678',
      password: 'password123',
    },
    {
      id: 1,
      name: 'John',
      age: 25,
      emailAdress: 'test@mail.com',
      phoneNumber: '0612345678',
      password: 'password123',
    },
    {
      id: 2,
      name: 'Test',
      age: 50,
      emailAdress: 'testmail@mail.com',
      phoneNumber: '0612345678',
      password: 'password123',
    },
  ];

  getUsersAsObservable(): Observable<IUser[]> {
    console.log('getUsersAsObservable aangeroepen');
    // 'of' is een rxjs operator die een Observable
    // maakt van de gegeven data.
    return of(this.users);
  }

  getUserById(id: number): IUser {
    return this.users.filter((c) => c.id == id)[0];
  }

  getUsers(): IUser[] {
    return this.users;
  }
  addUser(user: IUser) {
    console.log(user);
    user.id = this.users.length;
    this.users.push(user);
  }
  updateUser(updatedUser: IUser) {
    console.log(updatedUser);

    let user = this.users.find((obj) => obj.id == updatedUser.id);
    let index = this.users.indexOf(user!);
    this.users[index] = updatedUser;
  }
  deleteUser(id: number) {
    let user = this.users.find((obj) => obj.id == id);
    let index = this.users.indexOf(user!);
    this.users.splice(index, 1);
  }
}
