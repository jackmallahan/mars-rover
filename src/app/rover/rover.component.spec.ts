import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoverComponent } from './rover.component';

describe('RoverComponent', () => {
  let component: RoverComponent;
  let fixture: ComponentFixture<RoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoverComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoverComponent);
    component = fixture.componentInstance;
    component.rover = {
      id: 0,
      currentDirection: 'N',
      currentLocation: { x: 1, y: 2 },
    };
    component.directions = 'LMLMLMLMM';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validateDirections should return true with valid directions', () => {
    const validDirections = ['L', 'M', 'L', 'M', 'R', 'M'];
    expect(component.validateDirections(validDirections)).toBeTrue();
  });

  it('rotate should rotate rover 90 degrees', () => {
    expect(component.rotate('N', 'L')).toEqual('W');
    expect(component.rotate('E', 'L')).toEqual('N');
    expect(component.rotate('S', 'L')).toEqual('E');
    expect(component.rotate('W', 'L')).toEqual('S');

    expect(component.rotate('N', 'R')).toEqual('E');
    expect(component.rotate('E', 'R')).toEqual('S');
    expect(component.rotate('S', 'R')).toEqual('W');
    expect(component.rotate('W', 'R')).toEqual('N');
  });

  it('validateDirections should return false with invalid directions', () => {
    const invalidDirections = ['Q', 'r', '$'];
    expect(component.validateDirections(invalidDirections)).toBeFalse();
  });
});
