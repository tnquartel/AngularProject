import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FriendsService, IFriend, IFriendSuggestion, IGameRecommendation } from '../../../services/friends.service';
import { UserService } from '../user.service';

@Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
    styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
    friends: IFriend[] = [];
    suggestions: IFriendSuggestion[] = [];
    recommendations: IGameRecommendation[] = [];
    allUsers: any[] = [];
    currentUserId: string | null = null;
    loading = true;

    showAddModal = false;
    selectedUserId: string | null = null;

    constructor(
        private friendsService: FriendsService,
        private authService: AuthService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
        this.currentUserId = currentUser._id;
        
        this.friendsService.syncUser(currentUser._id, currentUser.name).subscribe({
            next: () => {
                console.log('User synced to Neo4j');
                this.loadData();
            },
            error: (err) => {
                console.error('Sync failed, loading data anyway:', err);
                this.loadData();
            }
        });
    }
}

    loadData(): void {
        if (!this.currentUserId) return;

        this.loading = true;

        this.friendsService.getFriends(this.currentUserId).subscribe({
            next: (friends) => {
                this.friends = friends;
                console.log('Friends loaded:', friends);
            },
            error: (err) => console.error('Error loading friends:', err)
        });

        this.friendsService.getFriendSuggestions(this.currentUserId).subscribe({
            next: (suggestions) => {
                this.suggestions = suggestions;
                console.log('Suggestions loaded:', suggestions);
            },
            error: (err) => console.error('Error loading suggestions:', err)
        });

        this.friendsService.getGameRecommendations(this.currentUserId).subscribe({
            next: (recommendations) => {
                this.recommendations = recommendations;
                console.log('Recommendations loaded:', recommendations);
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading recommendations:', err);
                this.loading = false;
            }
        });

        this.userService.getAll().subscribe({
            next: (users: any[]) => {
                this.allUsers = users.filter((u: any) => u._id !== this.currentUserId);
            },
            error: (err: any) => console.error('Error loading users:', err)
        });
    }

    openAddFriendModal(): void {
        this.showAddModal = true;
    }

    closeAddFriendModal(): void {
        this.showAddModal = false;
        this.selectedUserId = null;
    }

    addFriend(friendId: string): void {
        if (!this.currentUserId) return;

        this.friendsService.addFriend(this.currentUserId, friendId).subscribe({
            next: () => {
                console.log('Friend added!');
                this.closeAddFriendModal();
                this.loadData();
            },
            error: (err) => {
                console.error('Error adding friend:', err);
                alert('Failed to add friend');
            }
        });
    }

    removeFriend(friendId: string): void {
        if (!this.currentUserId) return;
        
        if (confirm('Are you sure you want to remove this friend?')) {
            this.friendsService.removeFriend(this.currentUserId, friendId).subscribe({
                next: () => {
                    console.log('Friend removed!');
                    this.loadData();
                },
                error: (err) => {
                    console.error('Error removing friend:', err);
                    alert('Failed to remove friend');
                }
            });
        }
    }

    addSuggestedFriend(friendId: string): void {
        this.addFriend(friendId);
    }
}