import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Rover, Plateau, Cardinals } from './rover-models';
import { DialogComponent } from '../lib/dialog/dialog.component';

@Component({
  selector: 'app-rover',
  templateUrl: './rover.component.html',
  styleUrls: ['./rover.component.scss'],
})
export class RoverComponent implements OnInit {
  plateau: Plateau = {};
  rovers: Rover[] = [];
  cardinals = Cardinals;
  result: string[] = [];
  errorMessage = '';
  invalidDirections = false;

  constructor(public dialog: MatDialog) {}

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

      if (!this.invalidDirections) {
        this.result.push(
          `${this.rovers[i].currentLocation.x} ${this.rovers[i].currentLocation.y} ${this.rovers[i].currentDirection}`
        );
      }
    });

    if (!this.invalidDirections) {
      this.openDialog('Final Coordinates', this.result, false);
    }
  }

  moveRover(i: number) {
    const directionArray = this.rovers[i].givenDirections.split('');
    const validDirections = this.validateDirections(directionArray);

    if (validDirections) {
      directionArray.forEach((direction) => {
        if (!this.invalidDirections) {
          if (direction === 'L' || direction === 'R')
            this.rovers[i].currentDirection = this.rotate(
              this.rovers[i].currentDirection,
              direction
            );
          if (direction === 'M') {
            this.move(this.rovers[i].currentDirection, i);
          }
        }
      });
    }
  }

  rotate(currentDirection: string, letter: string): string {
    if (letter === 'L') {
      // Manually looping the cardinals array if going from N -> W or W -> N
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
    // check if move is within boundary before moving
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

    // Output out of bounds error
    if (!validMove) {
      const title = 'Out of Bounds';
      const body = `Cannot Move Rover ${i + 1} from x:${
        this.rovers[i].currentLocation.x
      }, y:${this.rovers[i].currentLocation.y} to the ${direction}`;

      this.invalidDirections = true;

      this.openDialog(title, [body], true);
    }

    // Output collision error
    if (this.collisionDetection(this.rovers[i])) {
      const title = 'Collision Detected';
      const body = `Rover ${i + 1} collided with another rover!`;

      this.invalidDirections = true;
      this.openDialog(title, [body], true);
    }
  }

  collisionDetection(rover: Rover): boolean {
    return this.rovers.some((r) => {
      return (
        r.id !== rover.id &&
        r.currentLocation.x === rover.currentLocation.x &&
        r.currentLocation.y === rover.currentLocation.y
      );
    });
  }

  validateDirections(directionArray: string[]): boolean {
    const validDirections = ['L', 'R', 'M'];
    return directionArray.every((letter) => validDirections.includes(letter));
  }

  addRover(): void {
    // Use current length as index/id
    const id = this.rovers.length;
    this.rovers.push({
      id,
      currentDirection: 'N',
      givenDirections: '',
      currentLocation: { x: 0, y: 0 },
    });
  }

  deleteRover(): void {
    if (this.rovers.length > 1) {
      this.rovers.splice(-1);
    }
  }

  // Handle user input to avoid invalid directions
  filterInputDirections(e: any) {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode === 76 || charCode === 77 || charCode === 82) {
      return true;
    } else {
      e.preventDefault();
      return false;
    }
  }

  clearResults(): void {
    this.result = [];
    this.invalidDirections = false;
  }

  openDialog(title: string, body: string[], error: boolean): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '50%',
      data: { title, body, error },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.clearResults();
    });
  }
}
