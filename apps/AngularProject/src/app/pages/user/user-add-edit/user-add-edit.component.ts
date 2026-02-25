import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, IUser } from '../user.service';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent implements OnInit {
  user: IUser | undefined;
  staticUser: IUser | undefined;
  userId: string | null = null;
  userExists: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');

      if (this.userId) {
        this.userExists = true;

        this.userService.getById(this.userId).subscribe({
          next: (user) => {
            this.staticUser = user;
            this.user = { ...user };
          },
          error: (err) => {
            console.error('User not found', err);
            alert('User not found');
            this.router.navigate(['user']);
          }
        });
        
      } else {
        this.user = {
          name: '',
          age: 18,
          emailAddress: '',
          phoneNumber: '',
          role: 'user',
          gender: 'Unknown',
          isActive: true
        } as IUser;
      }
    });
  }

  onSubmit(): void {
    if (!this.user) {
      console.error('No user to submit');
      return;
    }

    console.log('Submit');
    if (this.userExists && this.user._id) {
      console.log('Update user');
      this.userService.update(this.user._id, this.user).subscribe({
        next: () => {
          console.log('User updated successfully');
          this.router.navigate(['user']);
        },
        error: (err) => {
          console.error('Error updating user:', err);
        }
      });
    } else {
      console.log('Add user');
      this.userService.create(this.user).subscribe({
        next: () => {
          console.log('User created successfully');
          this.router.navigate(['user']);
        },
        error: (err) => {
          console.error('Error creating user:', err);
        }
      });
    }
  }
}