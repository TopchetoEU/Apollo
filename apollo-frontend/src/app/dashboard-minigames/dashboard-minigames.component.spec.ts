import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMinigamesComponent } from './dashboard-minigames.component';

describe('DashboardMinigamesComponent', () => {
  let component: DashboardMinigamesComponent;
  let fixture: ComponentFixture<DashboardMinigamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardMinigamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMinigamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
