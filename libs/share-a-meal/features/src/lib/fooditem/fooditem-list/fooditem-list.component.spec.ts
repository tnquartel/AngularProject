import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooditemListComponent } from './fooditem-list.component';

describe('FooditemListComponent', () => {
    let component: FooditemListComponent;
    let fixture: ComponentFixture<FooditemListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FooditemListComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(FooditemListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
