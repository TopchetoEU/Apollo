import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinigameConveyorRecyclingComponent } from './minigame-conveyor-recycling.component';

describe('MinigameConveyorRecyclingComponent', () => {
  let component: MinigameConveyorRecyclingComponent;
  let fixture: ComponentFixture<MinigameConveyorRecyclingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinigameConveyorRecyclingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinigameConveyorRecyclingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
