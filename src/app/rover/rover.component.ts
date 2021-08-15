import { Component, OnInit } from '@angular/core';
import { Rover, Plateau } from './rover-models';

@Component({
  selector: 'app-rover',
  templateUrl: './rover.component.html',
  styleUrls: ['./rover.component.scss'],
})
export class RoverComponent implements OnInit {
  plateau: Plateau = {};
  rovers: Rover[] = [];
  cardinals = ['N', 'E', 'S', 'W'];
  errorMessage = '';
  result: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.rovers.push({
      id: 0,
      currentDirection: 'N',
      givenDirections: '',
      currentLocation: { x: 0, y: 0 },
    });
  }

  executeMoveRovers() {
    this.rovers.forEach((rover, i) => {
      this.moveRover(i);
    });
  }

  moveRover(i: number) {
    const directionArray = this.rovers[i].givenDirections.split('');
    const validDirections = this.validateDirections(directionArray);
    if (validDirections) {
      directionArray.forEach((direction) => {
        if (direction === 'L' || direction === 'R')
          this.rovers[i].currentDirection = this.rotate(
            this.rovers[i].currentDirection,
            direction
          );
        if (direction === 'M') {
          this.move(this.rovers[i].currentDirection, i);
        }
      });
    }

    if (!this.errorMessage) {
      this.result.push(
        `${this.rovers[i].currentLocation.x} ${this.rovers[i].currentLocation.y} ${this.rovers[i].currentDirection}`
      );
      console.log(this.result);
    }
  }

  rotate(currentDirection: string, letter: string): string {
    if (letter === 'L') {
      const newDirection =
        currentDirection === 'N'
          ? 'W'
          : this.cardinals[this.cardinals.indexOf(currentDirection) - 1];
      return newDirection;
    }

    if (letter === 'R') {
      const newDirection =
        currentDirection === 'W'
          ? 'N'
          : this.cardinals[this.cardinals.indexOf(currentDirection) + 1];
      return newDirection;
    }

    return '';
  }

  move(direction: string, i: number): void {
    let validMove = false;
    if (
      direction === 'N' &&
      this.rovers[i].currentLocation.y !== this.plateau.height
    ) {
      this.rovers[i].currentLocation.y++;
      validMove = true;
    }
    if (
      direction === 'E' &&
      this.rovers[i].currentLocation.x !== this.plateau.width
    ) {
      this.rovers[i].currentLocation.x++;
      validMove = true;
    }
    if (direction === 'S' && this.rovers[i].currentLocation.y !== 0) {
      this.rovers[i].currentLocation.y--;
      validMove = true;
    }
    if (direction === 'W' && this.rovers[i].currentLocation.x !== 0) {
      this.rovers[i].currentLocation.x--;
      validMove = true;
    }
    if (!validMove) {
      this.errorMessage = `Invalid Directions: Cannot Move Rover ${
        i + 1
      } from x:${this.rovers[i].currentLocation.x}, y:${
        this.rovers[i].currentLocation.y
      } to ${direction}`;
    }
  }

  filterInputDirections(e: any) {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode === 76 || charCode === 77 || charCode === 82) {
      return true;
    } else {
      e.preventDefault();
      return false;
    }
  }

  validateDirections(directionArray: string[]): boolean {
    const validDirections = ['L', 'R', 'M'];
    return directionArray.every((letter) => validDirections.includes(letter));
  }

  clearResults(): void {
    this.result = [];
    this.errorMessage = '';
  }

  addRover(): void {
    const id = this.rovers.length;
    this.rovers.push({
      id,
      currentDirection: 'N',
      givenDirections: '',
      currentLocation: { x: 0, y: 0 },
    });
  }
}
