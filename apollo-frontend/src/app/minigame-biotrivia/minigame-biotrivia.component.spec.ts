import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinigameBiotriviaComponent } from './minigame-biotrivia.component';

describe('MinigameBiotriviaComponent', () => {
  let component: MinigameBiotriviaComponent;
  let fixture: ComponentFixture<MinigameBiotriviaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinigameBiotriviaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinigameBiotriviaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
