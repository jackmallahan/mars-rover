import { Component, OnInit } from '@angular/core';
import { Rover, Plateau } from './rover-models';

@Component({
  selector: 'app-rover',
  templateUrl: './rover.component.html',
  styleUrls: ['./rover.component.scss'],
})
export class RoverComponent implements OnInit {
  plateau: Plateau = {};
  rover: Rover = {
    id: 0,
    currentDirection: 'N',
    currentLocation: { x: 0, y: 0 },
  };
  cardinals = ['N', 'E', 'S', 'W'];
  directions = '';
  constructor() {}

  ngOnInit(): void {}

  moveRover(): void {
    console.log(this.rover, this.plateau);
    const directionArray = this.directions.split('');
    const validDirections = this.validateDirections(directionArray);
    if (validDirections) {
      directionArray.forEach((direction, i) => {
        if (direction === 'L' || direction === 'R')
          this.rover.currentDirection = this.rotate(
            this.rover.currentDirection,
            direction
          );
        if (direction === 'M') this.move(direction);
      });
    }

    alert(
      `${this.rover.currentLocation.x} ${this.rover.currentLocation.y} ${this.rover.currentDirection}`
    );
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

  move(direction: string): void {
    if (
      direction === 'N' &&
      this.rover.currentLocation.y !== this.plateau.height
    ) {
      this.rover.currentLocation.y++;
    }

    switch (this.rover.currentDirection) {
      case 'N':
        this.rover.currentLocation.y;

        break;
      case 'E':
        this.rover.currentLocation.x++;
        break;
      case 'S':
        this.rover.currentLocation.y--;
        break;
      case 'W':
        this.rover.currentLocation.x--;
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
}
