import {ship, gameBoard} from "./index.js";

let testShip;
let gameBoardPlayer1;

beforeAll(() => {
    testShip = new ship(3);
    gameBoardPlayer1 = new gameBoard;
});
afterEach(() => {
    testShip = new ship(3);
    gameBoardPlayer1 = new gameBoard;
});
test("Ship's length is 3", () => {
    expect(testShip.length).toBe(3);
});
test("Ship's hits are 0 after creation", () => {
    expect(testShip.hits).toBe(0);
});
test("Increases hits after a hit", () => {
    const initialHits = testShip.hits;
    testShip.hit();
    expect(testShip.hits).toBe(initialHits + 1);
});
test("Ship is sunk after a number of hits", () => {
    for (let i = 0; i < testShip.length; i++) {
        testShip.hit();
    };
    expect(testShip.isSunk()).toBe(true);
});

// Gameboard

test("Creates a ship", () => {
    const coordinates = [{ y: 4, x: 2 }, { y: 4, x: 3 }];
    const length = 2;
    const newShip = gameBoardPlayer1.createShip(length, coordinates);
    expect(gameBoardPlayer1.shipsArray[0].newShip.isSunk()).toBe(false);
});
test("Places the ship to the coordinates", () => {
    const coordinates = [{ y: 4, x: 2 }, { y: 4, x: 3 }];
    const length = 2;
    const newShip = gameBoardPlayer1.createShip(length, coordinates);
    expect(gameBoardPlayer1.shipsArray[0].coordinates).toBe(coordinates);
});
test("Records a hit to the ship", () => {
    const coordinates = [{ y: 4, x: 2 }, { y: 4, x: 3 }];
    const length = 2;
    const newShip = gameBoardPlayer1.createShip(length, coordinates);
    gameBoardPlayer1.receiveHit({ y: 4, x: 2 });
    expect(gameBoardPlayer1.shipsArray[0].newShip.hits).toBe(1);
});
test("Sinks a ship", () => {
    const coordinates = [{ y: 4, x: 2 }, { y: 4, x: 3 }];
    const length = 2;
    const newShip = gameBoardPlayer1.createShip(length, coordinates);
    gameBoardPlayer1.receiveHit({ y: 4, x: 2 });
    gameBoardPlayer1.receiveHit({ y: 4, x: 3 });
    expect(gameBoardPlayer1.shipsArray[0].newShip.isSunk()).toBe(true);
});



