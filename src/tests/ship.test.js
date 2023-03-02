import {ship} from "../factories/ship.js";

let testShip;

beforeAll(() => {
    testShip = new ship(3);
});
afterEach(() => {
    testShip = new ship(3);
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


