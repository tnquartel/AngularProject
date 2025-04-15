import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperAddEditComponent } from './developer-add-edit.component';

describe('DeveloperAddEditComponent', () => {
  let component: DeveloperAddEditComponent;
  let fixture: ComponentFixture<DeveloperAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeveloperAddEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeveloperAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
