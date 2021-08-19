import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../material/material.module';
import { RoverComponent } from './rover.component';

describe('RoverComponent', () => {
  let component: RoverComponent;
  let fixture: ComponentFixture<RoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoverComponent],
      imports: [FormsModule, MaterialModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoverComponent);
    component = fixture.componentInstance;
    component.plateau = { height: 5, width: 5 };
    component.rovers = [
      {
        id: 0,
        currentDirection: 'N',
        givenDirections: 'LMLMLMLMM',
        currentLocation: { x: 1, y: 2 },
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('executeMoveRover should produce correct result', () => {
    component.rovers[1] = {
      id: 1,
      currentDirection: 'E',
      givenDirections: 'MMRMMRMRRM',
      currentLocation: { x: 3, y: 3 },
    };
    expect(component.result).toEqual([]);

    component.executeMoveRovers();
    expect(component.result).toEqual(['1 3 N', '5 1 E']);
  });

  it('moveRover should move rover to correct coordinates', () => {
    expect(component.rovers[0].currentLocation).toEqual({ x: 1, y: 2 });
    component.moveRover(0);
    expect(component.rovers[0].currentLocation).toEqual({ x: 1, y: 3 });

    component.rovers[1] = {
      id: 1,
      currentDirection: 'E',
      givenDirections: 'MMRMMRMRRM',
      currentLocation: { x: 3, y: 3 },
    };
    component.moveRover(1);
    expect(component.rovers[1].currentLocation).toEqual({ x: 5, y: 1 });
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
    expect(component.rovers[0].currentLocation).toEqual({ x: 1, y: 2 });
    component.move('N', 0);
    expect(component.rovers[0].currentLocation).toEqual({ x: 1, y: 3 });
    component.move('E', 0);
    expect(component.rovers[0].currentLocation).toEqual({ x: 2, y: 3 });
    component.move('S', 0);
    expect(component.rovers[0].currentLocation).toEqual({ x: 2, y: 2 });
    component.move('W', 0);
    expect(component.rovers[0].currentLocation).toEqual({ x: 1, y: 2 });
  });

  it('move should not move the rover outside of boundary', () => {
    expect(component.rovers[0].currentLocation).toEqual({ x: 1, y: 2 });
    component.move('W', 0);
    expect(component.rovers[0].currentLocation).toEqual({ x: 0, y: 2 });
    component.move('W', 0);
    expect(component.rovers[0].currentLocation).not.toEqual({ x: -1, y: 2 });
    expect(component.rovers[0].currentLocation).toEqual({ x: 0, y: 2 });
  });

  it('collisionDetection should return true when rovers occupy same location', () => {
    expect(component.rovers[0].currentLocation).toEqual({ x: 1, y: 2 });

    component.rovers[1] = {
      id: 1,
      currentDirection: 'N',
      givenDirections: '',
      currentLocation: { x: 1, y: 1 },
    };
    component.move('N', 1);
    expect(component.collisionDetection(component.rovers[1])).toBeTrue();
  });

  it('validateDirections should return true with valid directions', () => {
    const validDirections = ['L', 'M', 'L', 'M', 'R', 'M'];
    expect(component.validateDirections(validDirections)).toBeTrue();
  });

  it('validateDirections should return false with invalid directions', () => {
    const invalidDirections = ['Q', 'r', '$'];
    expect(component.validateDirections(invalidDirections)).toBeFalse();
  });

  it('addRover should add a rover', () => {
    component.rovers = [];
    expect(component.rovers.length).toEqual(0);
    component.addRover();
    expect(component.rovers.length).toEqual(1);
  });

  it('deleteRover should delete the last rover in the array', () => {
    component.rovers = [
      {
        id: 0,
        currentDirection: 'N',
        givenDirections: 'LMLMLMLMM',
        currentLocation: { x: 1, y: 2 },
      },
      {
        id: 1,
        currentDirection: 'N',
        givenDirections: '',
        currentLocation: { x: 1, y: 1 },
      },
    ];
    expect(component.rovers.length).toEqual(2);
    component.deleteRover();
    expect(component.rovers.length).toEqual(1);
  });

  it('deleteRover should not delete if only one rover', () => {
    component.rovers = [
      {
        id: 0,
        currentDirection: 'N',
        givenDirections: 'LMLMLMLMM',
        currentLocation: { x: 1, y: 2 },
      },
    ];
    expect(component.rovers.length).toEqual(1);
    component.deleteRover();
    expect(component.rovers.length).toEqual(1);
  });
});
