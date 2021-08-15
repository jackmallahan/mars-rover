export interface Rover {
  id?: number;
  currentDirection: string;
  givenDirections: string;
  currentLocation: { x: number; y: number };
}

export interface Plateau {
  height?: number;
  width?: number;
}
