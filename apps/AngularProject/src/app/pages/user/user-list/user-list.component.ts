import { Component, OnInit } from '@angular/core';
import { UserService, IUser } from '../user.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    users: IUser[] = [];
    loading = true;

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers(): void {
        this.loading = true;
        this.userService.getAll().subscribe({
            next: (users) => {
                this.users = users;
                this.loading = false;
                console.log('Users loaded:', users);
            },
            error: (error) => {
                console.error('Error loading users:', error);
                this.loading = false;
            }
        });
    }

    deleteUser(id: string): void {
        if (confirm('Are you sure you want to delete this user?')) {
            this.userService.delete(id).subscribe({
                next: () => {
                    this.loadUsers();
                },
                error: (err) => {
                    console.error('Error deleting user:', err);
                    alert('Failed to delete user');
                }
            });
        }
    }
}