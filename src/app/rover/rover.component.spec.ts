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
    component.plateau = { height: 5, width: 5 };
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

  it('moveRover should move rover to correct coordinates', () => {
    expect(component.rover.currentLocation).toEqual({ x: 1, y: 2 });
    component.moveRover();
    expect(component.result).toEqual('1 3 N');

    component.rover = {
      id: 1,
      currentDirection: 'E',
      currentLocation: { x: 3, y: 3 },
    };
    component.directions = 'MMRMMRMRRM';
    component.moveRover();
    expect(component.result).toEqual('5 1 E');
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

  it('move should move the rover by one unit in correct direction', () => {
    expect(component.rover.currentLocation).toEqual({ x: 1, y: 2 });
    component.move('N');
    expect(component.rover.currentLocation).toEqual({ x: 1, y: 3 });
    component.move('E');
    expect(component.rover.currentLocation).toEqual({ x: 2, y: 3 });
    component.move('S');
    expect(component.rover.currentLocation).toEqual({ x: 2, y: 2 });
    component.move('W');
    expect(component.rover.currentLocation).toEqual({ x: 1, y: 2 });
  });

  it('move should not move the rover outside of boundary', () => {
    expect(component.rover.currentLocation).toEqual({ x: 1, y: 2 });
    component.move('W');
    expect(component.rover.currentLocation).toEqual({ x: 0, y: 2 });
    component.move('W');
    expect(component.rover.currentLocation).not.toEqual({ x: -1, y: 2 });
    expect(component.rover.currentLocation).toEqual({ x: 0, y: 2 });
  });

  it('validateDirections should return true with valid directions', () => {
    const validDirections = ['L', 'M', 'L', 'M', 'R', 'M'];
    expect(component.validateDirections(validDirections)).toBeTrue();
  });

  it('validateDirections should return false with invalid directions', () => {
    const invalidDirections = ['Q', 'r', '$'];
    expect(component.validateDirections(invalidDirections)).toBeFalse();
  });
});
