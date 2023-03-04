import { gameBoard } from "../factories/gameBoard.js";

let gameBoardPlayer1;

beforeAll(() => {
    gameBoardPlayer1 = gameBoard();
});
afterEach(() => {
    gameBoardPlayer1 = gameBoard();
});

test("Creates a ship", () => {
    const coordinates = [{ y: 4, x: 2 }, { y: 4, x: 3 }];
    const length = 2;
    gameBoardPlayer1.createShip(length, coordinates);
    expect(gameBoardPlayer1.shipsArray[0].newShip.isSunk()).toBe(false);
});
test("Places the ship to the coordinates", () => {
    const coordinates = [{ y: 4, x: 2 }, { y: 4, x: 3 }];
    const length = 2;
    gameBoardPlayer1.createShip(length, coordinates);
    expect(gameBoardPlayer1.shipsArray[0].coordinates).toBe(coordinates);
});
test("Records a hit to the ship", () => {
    const coordinates = [{ y: 4, x: 2 }, { y: 4, x: 3 }];
    const length = 2;
    gameBoardPlayer1.createShip(length, coordinates);
    gameBoardPlayer1.receiveHit({ y: 4, x: 2 });
    expect(gameBoardPlayer1.shipsArray[0].newShip.hits).toBe(1);
});
test("Sinks a ship", () => {
    const coordinates = [{ y: 4, x: 2 }, { y: 4, x: 3 }];
    const length = 2;
    gameBoardPlayer1.createShip(length, coordinates);
    gameBoardPlayer1.receiveHit({ y: 4, x: 2 });
    gameBoardPlayer1.receiveHit({ y: 4, x: 3 });
    expect(gameBoardPlayer1.shipsArray[0].newShip.isSunk()).toBe(true);
});
test("Records a missed hit", () => {
    const coordinates = [{ y: 4, x: 2 }, { y: 4, x: 3 }];
    const length = 2;
    gameBoardPlayer1.createShip(length, coordinates);
    gameBoardPlayer1.receiveHit({ y: 5, x: 4 });
    expect(gameBoardPlayer1.missedHitsCoordinates.length).toBe(1);
});
test("Declares game over after all ships are sunk", () => {
    const coordinates1 = [{ y: 4, x: 2 }, { y: 4, x: 3 }];
    const length1 = 2;
    gameBoardPlayer1.createShip(length1, coordinates1);
    gameBoardPlayer1.receiveHit({ y: 4, x: 2 });
    gameBoardPlayer1.receiveHit({ y: 4, x: 3 });
    
    const coordinates2 = [{ y: 5, x: 2 }, { y: 5, x: 3 }, { y: 5, x: 4 }];
    const length2 = 3;
    gameBoardPlayer1.createShip(length2, coordinates2);
    gameBoardPlayer1.receiveHit({ y: 5, x: 2 });
    gameBoardPlayer1.receiveHit({ y: 5, x: 3 });
    gameBoardPlayer1.receiveHit({ y: 5, x: 4 });

    expect(gameBoardPlayer1.isGameOver()).toBe(true);
});




